(function()
  {
    function getFormData(form)
      {
        var elements = form.elements;
        var honeypot;
        var fields = Object.keys(elements).filter(function(k)
          {
            if (elements[k].name === "honeypot")
              {
                honeypot = elements[k].value;
                return false;
              }
            return true;
          }).map(function(k)
            {
              if(elements[k].name !== undefined)
                {
                  return elements[k].name;
                }
              else if(elements[k].length > 0)
                {
                  return elements[k].item(0).name;
                }
            }).filter(function(item, pos, self)
              {
                return self.indexOf(item) == pos && item;
              });
        var formData =
          {
          };
        fields.forEach(function(name)
          {
            var element = elements[name];
            formData[name] = element.value;
            if (element.length)
              {
                var data = [];
                for (var i = 0; i < element.length; i++)
                  {
                    var item = element.item(i);
                    if (item.checked || item.selected)
                      {
                        data.push(item.value);
                      }
                  }
                formData[name] = data.join(', ');
              }
          });
        formData.formDataNameOrder = JSON.stringify(fields);
        formData.formGoogleSheetName = form.dataset.sheet || "Responses";
        formData.formGoogleSen = form.dataset.email || "";
        return{data: formData, honeypot: honeypot};
      }
    function handleFormSubmit(event)
      {
        event.preventDefault();
        var form = event.target;
        var formData = getFormData(form);
        var data = formData.data;
        if (formData.honeypot)
          {
            return false;
          }
        disableAllButtons(form);
        var url = form.action;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        //xhr.withCredentials = true;
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function()
          {
            if (xhr.readyState === 4 && xhr.status === 200)
              {
                var formElements = form.querySelector(".form-elements")
                if (formElements)
                  {
                    formElements.style.display = "none";
                    setTimeout(function()
                      { 
                        formElements.style.display = "block"; 
                        form.reset();
                      }, 30000);
                  }
                var thankYouMessage = form.querySelector(".thankyou_message");
                if (thankYouMessage)
                  {
                    thankYouMessage.style.display = "block";
                    setTimeout(function()
                      { 
                        thankYouMessage.style.display = "none"; 
                      }, 30000);
                  }
                return;
              };
            };
        var encoded = Object.keys(data).map(function(k)
          {
            return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
          }).join('&');
        xhr.send(encoded);
      }
    function loaded()
      {
        var forms = document.querySelectorAll("form.gform");
        for (var i = 0; i < forms.length; i++)
          {
            forms[i].addEventListener("submit", handleFormSubmit, false);
          }
      };
    function disableAllButtons(form)
      {
        var buttons = form.querySelectorAll("button");
        for (var i = 0; i < buttons.length; i++)
          {
            buttons[i].disabled = true;
          }
      }
    function enableAllButtons(form)
      {
        var buttons2 = form.querySelectorAll("*");
        for (var i = 0; i < buttons2.length; i++)
          {
            buttons2[i].disabled = false;
          }
      }
      loaded();
  })();