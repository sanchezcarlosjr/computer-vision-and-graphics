---
layout: default
title:  "Computer Graphics"
---

<h1>{{ page.title }}</h1>

<ul>
  {% assign mypages = site.pages %}
    {% for page in mypages %}
    <li><a href="{{ page.url | absolute_url }}">{{ page.title }}</a></li>
  {% endfor %}
</ul>

