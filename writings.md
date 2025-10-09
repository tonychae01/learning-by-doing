---
layout: default
title: Writings
---

# Writings

<ul>
{% assign items = site.writings | sort: 'date' | reverse %}
{% for post in items %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <span class="summary"> — {{ post.date | date: "%Y-%m-%d" }}{% if post.summary %} · {{ post.summary }}{% endif %}</span>
  </li>
{% endfor %}
</ul>
