#Bindy.js!
A super simple, single feature declarative data-binding jquery plugin


##What bindy can do
  + You can bind data from inputs/textareas **to** js objects
  + You can bind data to text nodes **from** js objects
  + Execute functions in the context before/after data binds to the DOM
  + Filter output (binding *from* js objects) through functions you register


##TO USE

include in html
```html
  <script src="jquery.bindy.js"></script>
```

initialize
```html
<script>
  // this is all you need
  $.bindy();

  // ...but you can optionally set up a javascript object to pass into bindy
  var app = {};
  app.person = {
    name: '',
    job: '',
    age: nil
  };

  // and then initialize.
  $.bindy({
    model: app,
  });
</script>
```

bind data! You bind input TO person.name, and bind html FROM the js attribute person.name
```html
  <input type="text" data-bind-to="person.name">
  <input type="text" data-bind-to="person.job">
  <input type="text" data-bind-to="person.age">
  <p data-bind-from="person.name"></p>
  <p data-bind-from="person.job"></p>
  <p data-bind-from="person.age"></p>

```

initialize with before/after binding events
```html
<script>
  $.bindy({
    beforeUpdate: function(rootModel){
      var obj = rootModel.budget;
      // total up your rent
      rootModel.budget.total = 0;
      rootModel.budget.total += parseInt(b.rent, 10) || 0;
      rootModel.budget.total += parseInt(b.food, 10) || 0;
      rootModel.budget.total += parseInt(b.car, 10) || 0;
      rootModel.budget.total += parseInt(b.gym, 10) || 0;
      rootModel.budget.total += parseInt(b.transportation, 10) || 0;
      // must return the root object passed in to apply a transformation on your model
      return rootModel;
    }
  });
</script>
```



initialize with filters
```html
<script>
  $.bindy({
    filters: {
      toCurrency: function(string) {
        return '$ '+(parseInt(string, 10) || 0).toFixed(2);
      };
    }
  });
</script>
```
