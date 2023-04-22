---
layout: default
---

<div class="archive">
  {% for json in site.static_files %}
    {% if json.extname == ".json" and json.path contains "assets/evanotebooks" %}
      <div class="archive-item">
        <a href="https://notebook.sanchezcarlosjr.com/?u=https%3A%2F%2Fcg.sanchezcarlosjr.com{{ json.path }}" class="archive-title fs-4" target="_blank">{{ json.basename }}</a>
      </div>
    {% endif %}
  {% endfor %}
</div>

