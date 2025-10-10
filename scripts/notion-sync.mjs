// scripts/notion-sync.mjs
import notionPkg from "@notionhq/client"; // default import로 받아서 버전 호환 안전
const { Client } = notionPkg;

import { NotionToMarkdown } from "notion-to-md";
import fs from "node:fs";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DB_ID = (process.env.NOTION_DATABASE_ID || "").replace(/-/g, ""); // 하이픈 제거 안전 처리
const n2m = new NotionToMarkdown({ notionClient: notion });

function slugify(s) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

// 디버그: SDK 모양 점검
console.log("has databases? ", typeof notion.databases, " query:", typeof notion.databases?.query);

const res = await notion.databases.query({ database_id: DB_ID });
console.log("Found pages:", res.results?.length ?? 0);

for (const page of res.results) {
  const p = page.properties || {};

  const title =
    (p.Title?.title?.[0]?.plain_text) ||
    (p.Name?.title?.[0]?.plain_text) ||
    "untitled";

  const date = (p.Date?.date?.start) || new Date().toISOString().slice(0, 10);
  const summary = (p.Summary?.rich_text?.[0]?.plain_text) || "";
  const folder = (p.Folder?.select?.name?.toLowerCase()) || "writings";

  // 본문을 Markdown으로 변환 (반환 타입이 환경/버전에 따라 다름 → 방어 처리)
  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const mdRes = n2m.toMarkdownString(mdBlocks);

  let body = "";
  if (typeof mdRes === "string") {
    body = mdRes;
  } else if (Array.isArray(mdRes)) {
    body = mdRes.join("\n\n");
  } else if (mdRes && typeof mdRes === "object") {
    const parts = [];
    if (typeof mdRes.parent === "string") parts.push(mdRes.parent);
    if (Array.isArray(mdRes.children)) parts.push(...mdRes.children);
    body = parts.join("\n\n");
  }
  body = (body || "").trim();

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
