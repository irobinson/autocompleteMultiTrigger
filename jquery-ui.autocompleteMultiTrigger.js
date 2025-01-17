/*
 *  autocompleteTrigger (based on jQuery-UI Autocomplete)
 *  https://github.com/experteer/autocompleteTrigger
 *
 * Copyright 2011, Experteer GmbH, Munich
 *
 * @version: 1.0
 * @author <a href="mailto:daniel.mattes@experteer.com">Daniel Mattes</a>
 *
 * @requires jQuery 1.6> and jQuery-Ui (including Autocomplete)  1.8>
 *
 * @description
 * autocompleteTrigger allows you to specify a trigger (e. g. @ like twitter or facebook) and bind it to a textarea or input text field.
 * If a user writes the trigger-sign into the textbox, the autocomplete dialog will displayed and the text after the trigger-sign
 * will be used as search-query for the autocomplete options. If one of the suggested items will be selected, the value and trigger
 * will be added to the textfield.
 *
 * Thanks to https://github.com/kof/fieldSelection (getCursorPosition) and
 * http://stackoverflow.com/questions/4564378/jquery-autocomplete-plugin-that-triggers-after-token
 *
 * Dual licensed under MIT or GPLv2 licenses
 *   http://en.wikipedia.org/wiki/MIT_License
 *   http://en.wikipedia.org/wiki/GNU_General_Public_License
 *
 * @example
 * $('input').autocompleteTrigger({
 *   triggerStart : '@',
 *   triggerEnd: '',
 *   source: [
 "Asp",
 "BASIC",
 "COBOL",
 "ColdFusion",
 "Erlang",
 "Fortran",
 "Groovy",
 "Java",
 "JavaScript",
 "Lisp",
 "Perl",
 "PHP",
 "Python",
 "Ruby",
 "Scala",
 "Scheme"
 ]
 *  });
 */

;
(function($, window, document, undefined) {
  $.widget("ui.autocompleteMultiTrigger", {

    //Options to be used as defaults
    options:{
      triggerStart:['@','#'],
      triggerEnd:' ',
      sources: [ ['sample', 'first', 'source'],['second','test','data','set'] ]
    },

    _create:function() {
      this.triggered = false;

      this.element.autocomplete($.extend({

        search:function() {
          /**
           * @description only make a request and suggest items if acTrigger.triggered is true
           */
          var acTrigger = $(this).data("autocompleteMultiTrigger");
          return acTrigger.triggered;
        },
        select:function(event, ui) {
          /**
           * @description if a item is selected, insert the value between triggerStart and triggerEnd
           */
          acTrigger = $(this).data("autocompleteMultiTrigger");

          var text = this.value;
          var trigger = acTrigger.value;
          var cursorPosition = acTrigger.getCursorPosition();
          
          var lastTriggerPosition = text.substring(0, cursorPosition).lastIndexOf(acTrigger.value);
          var firstTextPart = text.substring(0, lastTriggerPosition + acTrigger.value.length) + ui.item.value + acTrigger.options.triggerEnd;
          this.value = firstTextPart + text.substring(cursorPosition, text.length);

          acTrigger.triggered = false;

          // set cursor position after the autocompleted text
          this.selectionStart = firstTextPart.length;
          this.selectionEnd = firstTextPart.length;

          return false;
        },
        focus:function() {
          /**
           * @description prevent to replace the hole text, if a item is hovered
           */

          return false;
        },
        minLength:0
      }, this.options))

        .bind("keyup", function(event) {
          /**
           * @description Bind to keyup-events to detect text changes.
           * If the trigger is found before the cursor, autocomplete will be called
           */
          var acTrigger = $(this).data("autocompleteMultiTrigger");

          if (event.keyCode == $.ui.keyCode.UP || event.keyCode == $.ui.keyCode.DOWN) {
            return;
          }
          
          if (event.keyCode == $.ui.keyCode.ESCAPE) {
            acTrigger.triggered = false;
            return;
          }
 
          var text = this.value;
          var textLength = text.length;
          var cursorPosition = acTrigger.getCursorPosition();
          var lastString;
          var query;
          var lastTriggerPosition;
          var trigger = acTrigger.options.triggerStart;
          
          if (textLength === 0) {
            acTrigger.triggered = false;
          }

          if (acTrigger.triggered) {
            lastTriggerPosition = text.substring(0, cursorPosition).lastIndexOf(acTrigger.value);
            query = text.substring(lastTriggerPosition + acTrigger.value.length, cursorPosition);
            $(this).autocomplete("search", query);
          }
          else if (textLength >= 1) {
            lastString = text.substring(cursorPosition - 1, cursorPosition);
            var triggerLocation = $.inArray(lastString, trigger);
            var isTriggered = (triggerLocation > -1);
            acTrigger.triggered = isTriggered;
            acTrigger.index = triggerLocation;
            acTrigger.value = (isTriggered ? trigger[triggerLocation] : '');
            var triggerSource = acTrigger.options.sources[acTrigger.index];
            $(this).autocomplete('option','source', triggerSource);
          }
        });
    },

    /**
     * @description Destroy an instantiated plugin and clean up modifications the widget has made to the DOM
     */
    destroy:function() {

      // this.element.removeStuff();
      // For UI 1.8, destroy must be invoked from the
      // base widget
      $.Widget.prototype.destroy.call(this);
      // For UI 1.9, define _destroy instead and don't
      // worry about
      // calling the base widget
    },

    /**
     * @description calculates the the current cursor position in the bound textfield, area,...
     * @returns {int}  the position of the cursor.
     */
    getCursorPosition:function() {
      var elem = this.element[0];
      var position = 0;

      // dom 3
      if (elem.selectionStart >= 0) {
        position = elem.selectionStart;
        // IE
      } else if (elem.ownerDocument.selection) {
        var r = elem.ownerDocument.selection.createRange();
        if (!r) return data;
        var tr = elem.createTextRange(), ctr = tr.duplicate();

        tr.moveToBookmark(r.getBookmark());
        ctr.setEndPoint('EndToStart', tr);
        position = ctr.text.length;
      }

      return position;
    }
  });
})(jQuery, window, document);