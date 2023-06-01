var element = document.getElementById('draggable-resizable');
var handle = document.getElementById('resize-handle');

var onMouseDown = function(event) {
  if (event.target === handle) {
    // Resize

    var initialWidth = element.offsetWidth;
    var initialHeight = element.offsetHeight;
    var initialMouseX = event.clientX;
    var initialMouseY = event.clientY;

    var onMouseMove = function(event) {
      var newWidth = initialWidth + event.clientX - initialMouseX;
      var newHeight = initialHeight + event.clientY - initialMouseY;

      element.style.width = Math.max(newWidth, 100) + "px"; // Set a minimum width
      element.style.height = Math.max(newHeight, 100) + "px"; // Set a minimum height
    };

    var onMouseUp = function() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  } else {
    // Drag

    var coords = getCoords(element);
    var shiftX = event.clientX - coords.left;
    var shiftY = event.clientY - coords.top;

    element.style.position = 'absolute';
    moveAt(event);

    function moveAt(event) {
      element.style.left = event.clientX - shiftX + 'px';
      element.style.top = event.clientY - shiftY + 'px';
    }

    var onMouseMove = function(event) {
      moveAt(event);
    };

    var onMouseUp = function() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  event.preventDefault(); // Prevents text selection
}

element.addEventListener('mousedown', onMouseDown);

function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset,
    left: box.left + window.pageXOffset
  };
}
