---
layout: default
title: Readings
permalink: /readings/
---

# Readings

<ul class="post-list">
{% assign posts = site.readings | sort: 'date' | reverse %}
{% for post in posts %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <span class="meta"> — {{ post.date | date: "%Y-%m-%d" }}{% if post.summary %} · {{ post.summary }}{% endif %}</span>
  </li>
{% endfor %}
</ul>



