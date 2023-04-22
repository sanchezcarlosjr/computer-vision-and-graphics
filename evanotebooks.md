---
layout: default
---

<div class="archive">
  {% for json in site.static_files %}
    {% if json.extname == ".json" and json.path contains "assets/evanotebooks" %}
      <div class="archive-item">
        <a href="{{ json.path }}" class="archive-title fs-4">{{ json.basename }}</a>
      </div>
    {% endif %}
  {% endfor %}
</div>

