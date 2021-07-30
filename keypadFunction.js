
// keypad vars start
var _isCorrect = false;
var _isEnt = false;
 
var keyPad;
var groupSymbol;
var groupNumber;
var btn_key_0, btn_key_1, btn_key_2, btn_key_3, btn_key_4, btn_key_5, btn_key_6, btn_key_7, btn_key_8, btn_key_9, btn_key_fn_sym, btn_key_fn_num, btn_key_fn_bs, btn_key_fn_ent, btn_key_fn_point;
var btn_img_0, btn_img_1, btn_img_2, btn_img_3, btn_img_4, btn_img_5, btn_img_6, btn_img_7, btn_img_8, btn_img_9;
var key_sym_1, key_sym_2, key_sym_3, key_sym_4, key_sym_5, key_sym_6, key_sym_7;

var currentText = 0;

var arrTxt = [];
var arrButtonCheck = [];

var _completed = false;

// keypad vars end


function arraysEqual(a1, a2) {
  return JSON.stringify(a1) == JSON.stringify(a2);
}

function goNextPage() {
  arrTxt.forEach(element => {
    $('#' + element)[0].removeEventListener('mousedown', handleShowKeyPad);
    //$('#' + element)[0].removeEventListener('touchstart', handleShowKeyPad);
  });

  arrButtonCheck.forEach(element => {
    $('#' + element).hide();
  });

}

// keypad functions start
function handleCheck(e) {
  handleHideKeyPad()

  var arrVal = [];
  
  for(var i = 0; i < arrTxt.length; i++) {
    arrVal[i] = Number($('#' + arrTxt[i]).html());
  }

  if (arraysEqual(arrVal, arrCorrect)) {
    fnCorrectKey();
  } else {
    for (var i = 0; i < arrTxt.length; i++) {
      if (arrVal[i] == arrCorrect[i]) {
        $('#' + arrTxt[i])[0].removeEventListener('mousedown', handleShowKeyPad);
        //$('#' + arrTxt[i])[0].removeEventListener('touchstart', handleShowKeyPad);
        $('#' + arrTxt[i]).attr('contentEditable', 'false');
      } else {
        $('#' + arrTxt[i])[0].addEventListener('mousedown', handleShowKeyPad);
        //$('#' + arrTxt[i])[0].addEventListener('touchstart', handleShowKeyPad);
        $('#' + arrTxt[i]).html('');
      }
    }
    fnWrongKey();
  }
}

function handleHideKeyPad(e) {
  $('#' + keyPad).hide();
 }

function handleShowKeyPad(e) {
  playProjectAudio(audios[2].src, { loop: false });
  _isCorrect = false;

  arrButtonCheck.forEach(element => {
    $('#' + element).hide();
  });

  currentText = e.target.idx;

  $('div[data-xelf-name="_______txt_' + currentText + '"]').attr('contentEditable', 'true');

  $('#' + keyPad).fadeIn();

  arrButtonCheck.forEach(element => {
    $('#' + element).hide();
  });

  for(var i = 0; i < arrTxt.length; i++) {
    if(currentText == (i + 1)) {
      $('#' + arrTxt[i]).html('');
    }
  }
}

function fnCorrectKey() {
  _completed = true;
  playProjectAudio(audios[0].src, { loop: false });
  for (var i = 1; i <= arrTxt.length; i++) {
    $('div[data-xelf-name="_______txt_' + i + '"]').attr('contentEditable', 'false');
  }
 

$('#' + btnCheck_1).fadeOut('slow');

  for(var i = 0; i < arrTxt.length; i++) {
    $('#' + arrTxt[i]).css('cursor', 'default');
    $('#' + arrTxt[i])[0].removeEventListener('mousedown', handleShowKeyPad);
    //$('#' + arrTxt[i])[0].removeEventListener('touchstart', handleShowKeyPad);
  }

  handleProtocol("completed");
  handleCursor('default');

  handleHideKeyPad();

  goNextPage();
}

function fnWrongKey() {
  playProjectAudio(audios[1].src, { loop: false });
  arrButtonCheck.forEach(element => {
    $('#' + element).hide();
  });
  handleHideKeyPad();
}

function handleKeypadClick(e) {
  var _number;
  if (e.target['idx'] != undefined) _number = e.target['idx'];
  if (e.target.parentElement['idx'] != undefined) _number = e.target.parentElement['idx'];
  if (e.target.parentElement.parentElement['idx'] != undefined) _number = e.target.parentElement.parentElement['idx'];
  if (e.target.parentElement.parentElement.parentElement['idx'] != undefined) _number = e.target.parentElement.parentElement.parentElement['idx'];
  var _target = null;
  var _value = null;
  var _maxLength = 0;
  _isEnt = false;
  if (_isCorrect) {
    if (_number == 'ent') {
      playProjectAudio(audios[3].src, { loop: false });
      handleHideKeyPad();
      _isEnt = true;
      $('div[data-xelf-name="_______txt_' + currentText + '"]').blur();
      currentText = 0;

      var isZero = 1;

      arrTxt.forEach(element => {
        var _length = $('#' + element).html().length;
        isZero *= _length;
      });

      if(isZero > 0) {
        arrButtonCheck.forEach(element => {
          $('#' + element).show();
        });
      }
    }
    return false;
  }
  playProjectAudio(audios[3].src, { loop: false });

  _target = $('#' + arrTxt[currentText - 1]);
  
  _maxLength = arrLength[currentText - 1];

 var _oldNumber = $(_target).html();

  if (_number == 'bs') {
    $('img[alt="key_fn_bs"]').hide();
    setTimeout(function () {
      $('img[alt="key_fn_bs"]').show();
    }, 200);
    if (_oldNumber.length > 1) {
      _value = _oldNumber.slice(0, _oldNumber.length - 1);
    } else {
      _value = '';
    }

    $(_target).html(_value);
  } else if (_number == 'ent') {
    handleHideKeyPad();
    _isEnt = true;
    $('div[data-xelf-name="_______txt_' + currentText + '"]').blur();

    var isZero = 1;

    arrTxt.forEach(element => {
      var _length = $('#' + element).html().length;
      isZero *= _length;
    });

    if (isZero > 0) {
      arrButtonCheck.forEach(element => {
        $('#' + element).show();
      });
    }

    $('#' + arrTxt[currentText - 1])[0].addEventListener('mousedown', handleShowKeyPad);
    //$('#' + arrTxt[currentText - 1])[0].addEventListener('touchstart', handleShowKeyPad);

    currentText = 0;
  } else if (_number == 'point') {
    $('img[alt="key_fn_point"]').hide();
    setTimeout(function () {
      $('img[alt="key_fn_point"]').show();
    }, 200);
    if (_oldNumber.length >= _maxLength) {
      return false;
    }
    _value = _oldNumber + '' + '.';
    if (_oldNumber.indexOf('.') == -1) {
      $(_target).html(_value);
    }
  } else if (_number == 'num') {
    $('img[alt="key_fn_num_o"]').show();
    $('img[alt="key_fn_sym"]').show();
    $('img[alt="key_fn_num"]').hide();
    $('img[alt="key_fn_sym_o"]').hide();
    $('#' + groupNumber).show();
    $('#' + groupSymbol).hide();
  } else if (_number == 'sym') {
    $('img[alt="key_fn_num"]').show();
    $('img[alt="key_fn_sym_o"]').show();
    $('img[alt="key_fn_num_o"]').hide();
    $('img[alt="key_fn_sym"]').hide();
    $('#' + groupNumber).hide();
    $('#' + groupSymbol).show();
  } else {
    if (_oldNumber.length >= _maxLength) {
      return false;
    }

    if (_number >= 10) {
      var target = (_number - 10)
      $('img[alt="key_sym_' + target + '"]').hide();
      setTimeout(function () {
        $('img[alt="key_sym_' + target + '"]').show();
      }, 200);

      switch (_number) {
        case 11:
          _number = '÷';
          break;

        case 12:
          _number = '×';
          break;

        case 13:
          _number = '＞';
          break;

        case 14:
          _number = '－';
          break;

        case 15:
          _number = '=';
          break;

        case 16:
          _number = '＋';
          break;

        case 17:
          _number = '＜';
          break;

        default:
          break;
      }
    } else {
      $('img[alt="key_' + _number + '"]').hide();
      setTimeout(function () {
        $('img[alt="key_' + _number + '"]').show();
      }, 200);
    }

    _value = _oldNumber + '' + _number;

    $(_target).html(_value);
  }

  if (_isCorrect || _isEnt) return false;
  $('div[data-xelf-name="_______txt_' + currentText + '"]').focus();
  document.execCommand('selectAll', false, null);
  document.getSelection().collapseToEnd();
};
// keypad functions end

function fnHideObjects(arr) {
  for (var i = 0; i < arr.length; i++) {
    $('#' + arr[i]).hide();
  }
}

function fnBindEvents(arrObj, arrEvent, arrFn) {
  for (var i = 0; i < arrObj.length; i++) {
    $('#' + arrObj[i]).bind(arrEvent[i], arrFn[i]);
  }
}


function handleCursor(arg) {
  
}

