let i, j, selElmnt, selected_item, option_list, option_item;
/*look for any elements with the class "custom-select":*/
let lan_select = document.getElementsByClassName("language_select");

for (i = 0; i < lan_select.length; i++)
{
  selElmnt = lan_select[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  selected_item = document.createElement("DIV");
  selected_item.setAttribute("class", "select-selected");
  selected_item.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  lan_select[i].appendChild(selected_item);
  /*for each element, create a new DIV that will contain the option list:*/
  option_list = document.createElement("DIV");
  option_list.setAttribute("class", "select-items select-hide");

  for (j = 0; j < selElmnt.length; j++)
  {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    option_item = document.createElement("DIV");
    option_item.innerHTML = selElmnt.options[j].innerHTML;

    option_item.addEventListener("click", function(e)
    {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        let y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;

        for (i = 0; i < s.length; i++)
        {
          if (s.options[i].innerHTML == this.innerHTML)
          {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++)
              y[k].removeAttribute("class");
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });

    option_list.appendChild(option_item);
  }
  lan_select[i].appendChild(option_list);

  selected_item.addEventListener("click", function(e)
  {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
      let alert = document.getElementById("language_alert");
      if (!!alert)
        alert.parentNode.removeChild(alert);
      let lan_select = document.getElementsByClassName("language_select");
      lan_select[0].classList.toggle("open");
    });
}


function closeAllSelect(elmnt)
{
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  let x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++)
  {
    if (elmnt == y[i])
    {
      arrNo.push(i)
    } else
    {
      y[i].classList.remove("select-arrow-active");
      let lan_select = document.getElementsByClassName("language_select");
      lan_select[0].classList.remove("open");
    }
  }
  for (i = 0; i < x.length; i++)
  {
    if (arrNo.indexOf(i))
    {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);


let slider = document.getElementById("myRange");
let output = document.getElementById("value");
output.innerHTML = slider.value;

slider.oninput = function()
{
  output.innerHTML = this.value;
}

/*submitForms = function()
{
    document.getElementById("len_form").submit();
    document.getElementById("lan_form").submit();
}*/