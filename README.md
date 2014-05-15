#Bindy.js!
A super simple, single feature declarative data-binding jquery plugin

##TO USE

include in html
```html
  <script src="jquery.bindy.js"></script>
```

initialize
```html
<script>
  // set up your javascript objects
  var app = {};
  app.person = {
    name: '',
    job: '',
    age: nil
  };

  // initialize bindy within a scope (heirarchical scope of js objects)
  $.bindy({
    scope: app,
  });
</script>
```

bind data!
```html
  <input type="text" data-bind-to="person.name">
  <input type="text" data-bind-to="person.job">
  <input type="text" data-bind-to="person.age">
  <p data-bind-from="person.name"></p>
  <p data-bind-from="person.job"></p>
  <p data-bind-from="person.age"></p>

```

##What bindy can do
  + You can bind data from inputs/textareas **to** js objects
  + You can bind data to text nodes **from** js objects
