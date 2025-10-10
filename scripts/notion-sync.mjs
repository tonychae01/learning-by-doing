import notionPkg from "@notionhq/client"; // default import로 받고
const { Client } = notionPkg;             // 여기서 Client 추출 (v2와 호환 안전)

import { NotionToMarkdown } from "notion-to-md";
import fs from "node:fs";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DB_ID = process.env.NOTION_DATABASE_ID;
const n2m = new NotionToMarkdown({ notionClient: notion });

function slugify(s) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

// 디버그: SDK 모양 점검
console.log("has databases? ", typeof notion.databases, " query:", typeof notion.databases?.query);

const res = await notion.databases.query({ database_id: DB_ID });

for (const page of res.results) {
  const p = page.properties;

  const title =
    (p.Title?.title?.[0]?.plain_text) ||
    (p.Name?.title?.[0]?.plain_text) ||
    "untitled";

  const date = (p.Date?.date?.start) || new Date().toISOString().slice(0, 10);
  const summary = (p.Summary?.rich_text?.[0]?.plain_text) || "";
  const folder = (p.Folder?.select?.name?.toLowerCase()) || "writings";

  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const { parent, children } = n2m.toMarkdownString(mdBlocks);
  const body = [parent, ...children].join("\n\n").trim();

  const slug = slugify(title);
  const outDir = `_${folder}`;
  const outPath = `${outDir}/${slug}.md`;

  const fm =
`---
layout: default
title: "${title.replace(/"/g, '\\"')}"
date: ${date}
summary: "${summary.replace(/"/g, '\\"')}"
---`;

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, fm + "\n\n" + (body || "*No content*"), "utf8");
  console.log("Wrote:", outPath);
}
