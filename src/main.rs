use std::{env, fs, io::Write};

use chrono::Utc;
use chrono_tz::Asia::Tokyo;
use serde_json::json;
use sha2::{Digest, Sha256};

fn main() -> anyhow::Result<()> {
    dotenvy::dotenv().ok();

    let raw_markdown = reqwest::blocking::get(format!(
        "https://gist.github.com/{}/raw",
        env::var("GIST_ID").unwrap()
    ))?
    .text()?;
    let posts = raw_markdown.split("---").collect::<Vec<_>>();

    let dir = "site";
    fs::create_dir_all(dir)?;

    let diary_re = regex::Regex::new(r"## ([0-9]{4}).([0-9]{2}).([0-9]{2})(?: (.*))?").unwrap();
    let tags_re = regex::Regex::new(r#"tags = \[(("[a-z]+"(,\s)?)*)\]"#).unwrap();
    for post in posts {
        if !diary_re.is_match(post) {
            continue;
        }

        let caps = diary_re.captures(post).unwrap();
        let date_str = format!(
            "{}-{}-{}",
            caps.get(1).unwrap().as_str(),
            caps.get(2).unwrap().as_str(),
            caps.get(3).unwrap().as_str()
        );

        let post_date = chrono::NaiveDate::parse_from_str(&date_str, "%Y-%m-%d")?;
        let today = Utc::now().with_timezone(&Tokyo).date_naive();
        if post_date >= today {
            continue;
        }

        let tags = match tags_re.captures(post) {
            Some(v) => format!(
                "tags:\n{}\n",
                v.get(1)
                    .unwrap()
                    .as_str()
                    .split(',')
                    .map(|item| format!("  - {}", item.trim()))
                    .collect::<Vec<_>>()
                    .join("\n")
            ),
            None => "".to_string(),
        };

        let title = match caps.get(4) {
            Some(title) => title.as_str().to_string(),
            None => "".to_string(),
        };

        let space_re = regex::Regex::new(r"[\s\t\n]").unwrap();
        let minified_markdown = space_re.replace_all(&raw_markdown, "");
        let mut file = fs::File::create(format!("{dir}/static/meta.json"))?;
        let hash = Sha256::digest(minified_markdown.as_bytes());
        file.write_all(
            json!({
                "hash": format!("{:x}", hash),
            })
            .to_string()
            .as_bytes(),
        )?;

        let mut file = fs::File::create(format!("{dir}/posts/{date_str}.mdx",))?;
        file.write_all(
            format!(
                "---\ntitle: \"{title}\"\ndate: \"{date_str}\"\n{tags}---\n\n{}\n",
                tags_re.replace(&post.replace("## ", "# "), "").trim()
            )
            .as_bytes(),
        )?;
    }

    Ok(())
}
