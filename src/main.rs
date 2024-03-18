use std::{env, fs, io::Write};

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

        let title = match caps.get(4) {
            Some(title) => title.as_str().to_string(),
            None => "".to_string(),
        };

        let space_re = regex::Regex::new(r"[\s\t\n]").unwrap();
        let minified_markdown = space_re.replace_all(&raw_markdown, "");
        let mut file = fs::File::create(format!("{dir}/static/hash.json"))?;
        let hash = Sha256::digest(minified_markdown.as_bytes());
        file.write_all(format!(r#"{{"hash":"{:x}"}}"#, hash).as_bytes())?;

        let mut file = fs::File::create(format!("{dir}/posts/{date_str}.mdx",))?;
        file.write_all(
            format!(
                "---\ntitle: \"{title}\"\ndate: \"{date_str}\"\n---\n\n{}\n",
                post.trim().replace("## ", "# ")
            )
            .as_bytes(),
        )?;
    }

    Ok(())
}
