use std::{fs, io::Write};

fn main() -> anyhow::Result<()> {
    let raw_markdown = reqwest::blocking::get(
        "https://gist.github.com/s7tya/efff8d8635292b8a3305c850e5be2330/raw",
    )?
    .text()?;
    // let raw_markdown = fs::read_to_string("s7tya-diary-2024.md")?;
    let posts = raw_markdown.split("---").collect::<Vec<_>>();

    let dir = "site/posts/";
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
            Some(title) => format!(" {}", title.as_str()),
            None => "".to_string(),
        };

        let mut file = fs::File::create(format!("{dir}{date_str}.mdx",))?;
        file.write_all(
            format!(
                r#"---\ntitle: "{date_str}{title}"\n---\n\n{}\n"#,
                post.trim().replace("##", "#")
            )
            .as_bytes(),
        )?;
    }

    Ok(())
}
