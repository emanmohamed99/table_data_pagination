// const formdata = new FormData(document.querySelector("form"));
import axios from "axios";
document.querySelector("thead")!.classList.add("none");
document.querySelector(".pagination")!.classList.add("none");
document.querySelector(".header")!.classList.add("visible");
document.getElementById("submit")!.onclick = async function (event) {
  event.preventDefault();

  const formdata = new FormData(document.querySelector("form")!);
  let keyword = formdata.get("keyword");
  let res = await axios.get(`https://api.github.com/search/users?q=${keyword}`);

  const data = res.data.items;
  function addData() {
    document.querySelector("thead")!.classList.remove("none");
    document.querySelector(".pagination")!.classList.remove("none");
    document.querySelector(".header")!.classList.remove("visible");
    const tableBody = document.querySelector("tbody");
    data.map((datas: any) => {
      tableBody!.innerHTML += `<tr>
      <td>${datas.avatar_url}</td>
      <td>${datas.login}</td>
      <td>${datas.type}</td>
      </tr>
    `;
    });
  }
  function reloadData() {
    addData();
    var tbody: HTMLTableSectionElement | null = document.querySelector("tbody");
    var pageUl = document.querySelector(".pagination") as HTMLSelectElement;
    var itemShow = document.querySelector("#itemperpage") as HTMLSelectElement;
    var tr = tbody!.querySelectorAll("tr");

    var emptyBox: any = [];
    var index = 1;
    var itemPerPage = 8;

    for (let i: number = 0; i < tr.length; i++) {
      emptyBox.push(tr[i]);
    }

    itemShow!.onchange = giveTrPerPage;
    function giveTrPerPage(this: any): void {
      itemPerPage = Number(this.value);
      // console.log(itemPerPage);
      displayPage(itemPerPage);
      pageGenerator(itemPerPage);
      getpagElement(itemPerPage);
    }

    function displayPage(limit: number) {
      tbody!.innerHTML = "";
      for (let i = 0; i < limit; i++) {
        tbody!.appendChild(emptyBox[i]);
      }
      const pageNum = pageUl!.querySelectorAll(".list");
      pageNum.forEach((n) => n.remove());
    }
    displayPage(itemPerPage);

    function pageGenerator(getem: number) {
      const num_of_tr = emptyBox.length;
      if (num_of_tr <= getem) {
        pageUl.style.display = "none";
      } else {
        pageUl.style.display = "flex";
        const num_Of_Page = Math.ceil(num_of_tr / getem);
        for (let i = 1; i <= num_Of_Page; i++) {
          const li = document.createElement("li");
          li.className = "list";
          const a: any = document.createElement("a");
          a.href = "#";
          a.innerText = i;
          a.setAttribute("data-page", i);
          li.appendChild(a);
          pageUl!.insertBefore(li, pageUl!.querySelector(".next"));
        }
      }
    }
    pageGenerator(itemPerPage);
    let pageLink = pageUl!.querySelectorAll("a");
    let lastPage = pageLink.length - 2;

    function pageRunner(
      page: any,
      items: number,
      lastPage: number,
      active: any
    ) {
      for (let button of page) {
        button.onclick = (e: any) => {
          const page_num = e.target.getAttribute("data-page");
          const page_mover = e.target.getAttribute("id");
          if (page_num != null) {
            index = page_num;
          } else {
            if (page_mover === "next") {
              index++;
              if (index >= lastPage) {
                index = lastPage;
              }
            } else {
              index--;
              if (index <= 1) {
                index = 1;
              }
            }
          }
          pageMaker(index, items, active);
        };
      }
    }
    var pageLi = pageUl.querySelectorAll(".list");
    pageLi[0].classList.add("active");
    pageRunner(pageLink, itemPerPage, lastPage, pageLi);

    function getpagElement(val: number) {
      let pagelink = pageUl!.querySelectorAll("a");
      let lastpage = pagelink!.length - 2;
      let pageli = pageUl!.querySelectorAll(".list");
      pageli[0].classList.add("active");
      pageRunner(pagelink, val, lastpage, pageli);
    }

    function pageMaker(index: number, item_per_page: number, activePage: any) {
      const start = item_per_page * index;
      const end = start + item_per_page;
      const current_page = emptyBox.slice(
        start - item_per_page,
        end - item_per_page
      );
      tbody!.innerHTML = "";
      for (let j = 0; j < current_page.length; j++) {
        let item = current_page[j];
        tbody!.appendChild(item);
      }
      Array.from(activePage).forEach((e: any) => {
        e.classList.remove("active");
      });
      activePage[index - 1].classList.add("active");
    }
  }
  reloadData();
};
