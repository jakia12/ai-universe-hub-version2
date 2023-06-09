//fetch api
const loadToolsData = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/ai/tools"
    );
    const data = await res.json();
    const toolsData = await data.data.tools;

    return toolsData;
  } catch (err) {
    console.log(err);
  }
};

//console.log(loadToolsData());

//show spinner before loading the data
const loadingSpinner = (isLoaded) => {
  const spinnerLoader = document.getElementById("spinner");
  if (isLoaded) {
    spinnerLoader.classList.remove("hidden");
  } else {
    spinnerLoader.classList.add("hidden");
  }
};

//hide see more btn before loading tools data
const hideSeeMoreBtn = (isVisible) => {
  const seeMorebtn = document.getElementById("seeMoreBtn");

  if (!isVisible) {
    seeMorebtn.classList.add("hidden");
  } else {
    seeMorebtn.classList.remove("hidden");
  }
};
//pass the all tools dat in tools variable

const slicedTools = async () => {
  const allTools = await loadToolsData();

  let cardToShow = 6;

  let next = cardToShow;

  const slicedData = allTools?.slice(0, next);
  //visible this button after loading the data
  hideSeeMoreBtn(true);
  return slicedData;
};

const displayToolsData = async (allTools) => {
  //display loading spinner while fetching data
  loadingSpinner(true);

  //hide this button before loadig the data
  hideSeeMoreBtn(false);

  //get all tools data
  const tools = await allTools;

  //get the tools card container
  const toolsRow = document.querySelector("#toolsContainer");

  toolsRow.innerHTML = "";

  tools?.forEach((tool) => {
    const { id, name, image, features, published_in, description, links } =
      tool;

    const modifiedFeatures = features.join();

    var str2 = modifiedFeatures.replace(/,/g, " ");
    console.log(typeof str2);
    //       let linkObj= {};

    // links.map((link) => {
    //       linkItem: link;
    //     });

    //console.log(linkName, url);
    console.log(links);
    //create a column div
    const div = document.createElement("div");
    div.classList.add("w-full", "sm:w-6/12", "md:w-4/12", "mx-auto", "sm:mx-0");

    div.innerHTML = `
    <div class="m-3 border border-gray-200 rounded-lg text-left p-5 card_h">
    <img
      src="${image ? image : "No data available"}"
      alt=""
      class="rounded-lg w-[430px] h-[200px] max-w-full mb-3"
    />
    <h3 class="text-[25px] text-textPrimary font-[600] "> Features</h3>
    <ul>
      ${features?.map(
        (feature) =>
          `<li class="list-decimal mb-2 text-[16px] font-normal text-textSecondary ml-5">
        ${feature ? feature : "No data available"}
      </li>
        `
      )}
      
    </ul>
    <hr class="my-4 text-gray-300" />
    <div class="flex items-center justify-between">
      <div class=" text-left">
        <h3 class="text-[25px] text-textPrimary font-[600] mb-2">
          ${name ? name : "No data available"}
        </h3>
        <div class="flex items-center ">
          <img src={calenderIcon} alt="" class="" />
          <span class="text-[16px] font-normal text-textSecondary ml-4">
            ${published_in ? published_in : "No data available"}
          </span>
        </div>
      </div>
     
      <label for="my-modal-3" onclick="handleShowDetails('${image}','${features}','${links}','${description}',)">
        <span class="text-[18px] text-btnPrimary text-center rounded-full w-[46px] h-[46px] bg-lightPink shadow shadow-gray-200 flex items-center justify-center">
        <i class="fa-solid fa-arrow-right"></i>
        </span>
      </label>
    </div>
    
    
    
  </div>
    `;

    //append the div to the parent element
    toolsRow.appendChild(div);
  });

  //remove loading spinner once data is loaded
  loadingSpinner(false);
};

//

// display details data when clicking on modal

displayToolsData(slicedTools());

//display modal when clicking on arrow button

const handleShowDetails = (image, features, links, description) => {
  console.log(image, typeof features);

  let ftArr = features.split(",");
  console.log(ftArr);

  // let linkArr = [];
  // if (links) {
  //   linkArr.push(links["name"]["url"]);
  // }

  // console.log(linkArr);

  //get the modal container
  const modalWrapper = document.querySelector("#modalBody");

  modalWrapper.innerHTML = `
  <div class="flex items-center flex-wrap lg:flex-nowrap">
  <div class="w-full md:w-6/12">
    <div class="p-3 lg:p-8 border border-[#EB5757] rounded bg-lightPink col_h mx-2.5 ">
      <p class="text-[25px] font-[600] text-textprimary mb-4">
        ${description ? description : "No Data Available"}
      </p>
      
      <div class="flex items-center md:justify-center flex-wrap md:flex-nowrap mb-5">
        <div class="bg-white p-3 lg:p-6 box_w flex items-center justify-center rounded-lg mx-2 mt-4 md:mt-0">
          <span class="text-semibold text-lg text-[#03A30A] leading-[21px]">
            $10/month Basic
          </span>
        </div>
        <div class="bg-white p-3 lg:p-6 box_w flex items-center justify-center rounded-lg mx-2 mt-4 md:mt-0">
          <span class="text-semibold text-lg text-[#F28927] leading-[21px]">
            $50/month Pro
          </span>
        </div>
        <div class="bg-white p-3 lg:p-6 box_w flex items-center justify-center rounded-lg mx-2 mt-4 md:mt-0">
          <span class="text-semibold text-lg text-[#EB5757] leading-[21px]">
            Contact us Enterprise
          </span>
        </div>
      </div>
      
      <div class="flex  justify-between  mb-4">
        <div class="text-left">
          <h3 class="text-[25px] text-textPrimary font-[600] mb-2">
            Features
          </h3>
          <ul>
          ${ftArr.map(
            (ft) =>
              `
            <li class="list-disc mb-2 text-[16px] font-normal text-textSecondary ml-4">
            ${ft ? ft : "No data available"}
          </li>
            `
          )}
         
          
          </ul>
        </div>
        <div class="text-left">
          <h3 class="text-[25px] text-textPrimary font-[600] mb-2">
            Integrations
          </h3>
          <ul>
          
    
  <li class="list-disc mb-2 text-[16px] font-normal text-textSecondary ml-4">
    <a href="">
     
    </a>
  </li>
  

          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full md:w-6/12">
   
    <div class="p-6 text-center mx-2.5 mt-5 md:mt-0 border border-gray-200 col_h rounded ">
      <img
        src="${image ? image : "No data available"}"
        class="w-[437px] h-[339px] max-w-full rounded-lg "
        alt=""
      />
      <h3 class="text-[25px] text-textPrimary font-[600] mt-4 mb-2 ">
        Hi, how are you doing today?
      </h3>
      <p class="list-disc mb-2 text-[16px] font-normal text-textSecondary ml-4">
        I'm doing well, thank you for asking. How can I assist you
        today?
      </p>
    </div>
  </div>
</div>
  `;
};

//sort data by date
const sortBtn = document.querySelector("#sortBtn");
if (sortBtn) {
  sortBtn.addEventListener("click", async () => {
    const toolsData = await loadToolsData();

    const sortedTools = toolsData.sort(
      (a, b) => Date.parse(b.published_in) - Date.parse(a.published_in)
    );

    displayToolsData(sortedTools);
    //visible this button after loading the data
    hideSeeMoreBtn(true);
  });
}

//show all data clicking on see mor btn
const loadMoreBtn = document.querySelector("#seeMoreBtn");

if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const toolsInfo = await loadToolsData();
    console.log("clicked", toolsInfo);
    displayToolsData(toolsInfo);

    hideSeeMoreBtn(false);
  });
}
