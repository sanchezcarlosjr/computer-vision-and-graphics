---
layout: default
---

<h1>Computer Vision and Graphics</h1>
<h2>By Carlos Eduardo Sanchez Torres (aka sanchezcarlosjr)</h2>
<p>You can learn more about Computer Vision and Graphics <a href="https://carlos-eduardo-sanchez-torres.sanchezcarlosjr.com/Computer-Graphics-CG-0dd2efc64df946359e6b8edaa91eb947">here</a>. </p>

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
