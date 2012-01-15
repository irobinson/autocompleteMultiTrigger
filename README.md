autocompleteMultiTrigger (based on autocompleteTrigger, which is based on jQuery-UI Autocomplete)
================================

A version of autocompleteTrigger (https://github.com/experteer/autocompleteTrigger) modified specifically for the use case where you need to support both @ (username lookup) and # (tag lookup) in one input/textarea.

Requirements

  - jQuery (http://www.jquery.com)
  - jQuery-UI (http://www.jqueryui.com)

Example
---
```
$('input,textarea').autocompleteMultiTrigger({
  triggerStart:['@','#'],
  triggerEnd:' ',
  sources: [ ['sample', 'first', 'source'],['second','test','data','set'] ]
});
```

Demo: http://jsfiddle.net/irobinson/m8LB5/