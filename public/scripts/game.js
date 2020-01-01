function init(language)
{
  let keyboard = document.querySelector("#keyboard");
  let i = 0;
  if (language == "en")
  {
    for (i = 1; i <= 26; i++)
      keyboard.appendChild(create_key(i, true));
    let s = document.querySelector("#key_19");
    s.style.marginLeft = "45px";
  }
  else
  {
    for (i = 1; i <= 32; i++)
        keyboard.appendChild(create_key(i, false));
    for(i = 1; i <= 11; i++)
    {
      let top_row_key = document.querySelector("#key_" + i);
      top_row_key.style.marginTop = "30px"
    }
    let ts = document.querySelector("#key_23");
    ts.style.marginLeft = "45px"
  }
}

function create_key(i, is_en)
{
  let key = document.createElement("input");
  key.className = "key";
  key.className += " button";
  key.name = "letter";
  let char;
  if (is_en)
  {
    key.className += " en";
    char = String.fromCharCode("A".charCodeAt(0) + i - 1).toUpperCase();
    key.id = "key_" + i;
  }

  else
  {
    key.className += " ru";
    char = String.fromCharCode("А".charCodeAt(0) + i - 1).toUpperCase();
    key.id = "key_" + i;
  }

  key.value += char;
  key.type = "submit";
  key.disabled = false;
  key.onclick = function()
  {
    this.className += " used_letter";
    this.disabled = true;
    let url = "/game?letter=" + i
    $('#game').load(url + ' #game', function(response, status)
    {
      if (document.querySelector(".word").innerHTML.indexOf("_") == -1 ||
          document.querySelector(".hangman9") != undefined )
            window.location.replace("/gameover");
    });
  }
  return key;
}