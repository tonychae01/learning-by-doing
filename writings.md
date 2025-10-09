---
layout: default
title: Writings
permalink: /writings/
---

# Writings

<ul>
{% assign posts = site.writings | sort: 'date' | reverse %}
{% for post in posts %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <span style="color:#666"> — {{ post.date | date: "%Y-%m-%d" }}{% if post.summary %} · {{ post.summary }}{% endif %}</span>
  </li>
{% endfor %}
</ul>
