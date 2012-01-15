autocompleteTrigger (based on jQuery-UI Autocomplete)
================================

autocompleteTrigger allows you to specify a trigger (e. g. @ like twitter or facebook) and bind it to a textarea or input text field.
If a user writes the trigger-sign into the textbox, the autocomplete dialog will displayed and the text after the trigger-sign will be used as search-query for the autocomplete options. If one of the suggested items will be selected, the value and trigger will be added to the textfield.

Requirements

  - jQuery (http://www.jquery.com)
  - jQuery-UI (http://www.jqueryui.com)

Example
---
```
$('input').autocompleteTrigger({
  triggerStart:['@','#'], // array of triggers
  triggerEnd:' ',
  sources: [ ['sample', 'first', 'source'],['second','test','data','set'] ] // array of sources, source is matched to the trigger at the same index in the array
});
```

Demo: http://jsfiddle.net/dmattes/2YRgW/1/