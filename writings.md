---
layout: none
title: Writings
---
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Writings | Tony Chae</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <aside>
    <img src="assets/tony.jpg" alt="Tony Chae" class="profile">
    <nav>
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
    </nav>
    <footer>© 2025 Tony Chae</footer>
  </aside>

  <main>
    <h1>Writings</h1>
    <ul>
      {% assign posts = site.writings | sort: 'date' | reverse %}
      {% for post in posts %}
        <li>
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
          <span style="color:#666">— {{ post.date | date: "%Y-%m-%d" }}</span>
        </li>
      {% endfor %}
    </ul>
  </main>
</body>
</html>
