
        const btn = document.querySelector("button");
        const rateThis = document.querySelector(".rate-this");
        const post = document.querySelector(".post");
        const widget = document.querySelector(".star-widget");
        const editBtn = document.querySelector(".edit");
        btn.onclick = ()=>{
          rateThis.style.display = "none";
          widget.style.display = "none";
          post.style.display = "block";
          editBtn.onclick = ()=>{
          rateThis.style.display = "block";
          widget.style.display = "block";
          post.style.display = "none";
          }
          return false;
        }
      