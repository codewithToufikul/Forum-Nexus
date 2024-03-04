
const allData = async(seachData ="") =>{
  const loadingSpiner = document.getElementById('loadingSpiner');
      loadingSpiner.classList.remove('hidden');
      await new Promise(resolve => setTimeout(resolve, 2000));
    const allPost = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${seachData}`);
    const res = await allPost.json()
    const posts = res.posts;
    
    const parentDiv = document.getElementById('parentDiv');
    parentDiv.textContent = ' '
    
    const allPostArr = [];
    const post = posts.forEach(post => {
      loadingSpiner.classList.add('hidden')
      allPostArr.push(1);
        const postArea = document.createElement('div');
        
        postArea.innerHTML = `
        <div class="bg-[#F3F3F5] lg:p-10 p-3 rounded-3xl max-h-[270px]">

          <div class="flex gap-3 lg:gap-6">
            <div class="avatar lg:w-[72px] w-[42px] h-[42px] lg:h-[72px] relative">
                <div class="activeStatus lg:w-[15px] w-[10px] lg:h-[15px] h-[10px]  rounded-full absolute top-[-3%] right-[-3%]">
                    
                </div>
              <div class=" rounded-2xl">
                <img src="${post.image}" />
              </div>
            </div>
            <div class="lg:space-y-4 space-y-2">
              <div class="flex gap-4">
                <p>#<span>${post.category}</span></p>
                <p>Author : <span>${post.author.name}</span></p>
              </div>
              <div class="pb-4 lg:space-y-3">
                <h1 class="lg:text-xl font-bold">${post.title}</h1>
              <p class="lg:text-base font-normal text-[#12132D99]">${post.description}</p>
              </div>
              <div class="lg:w-[540px] md:w-[500px] border-t-2 border-dashed pt-5">
              <div class="flex justify-between">
                <div class="flex gap-4 lg:gap-8">
                  <div class="flex items-center gap-2">
                    <i class="fa-regular fa-comment-dots lg:text-2xl text-[#12132D99]"></i>
                    <p class="lg:text-xl text-[#12132D99]">${post.comment_count}</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <i class="fa-regular fa-eye lg:text-2xl text-[#12132D99]"></i>
                    <p class="lg:text-xl text-[#12132D99]">${post.view_count}</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <i class="fa-regular fa-clock lg:text-2xl text-[#12132D99]"></i>
                    <p class="lg:text-xl text-[#12132D99]"><span>${post.posted_time}</span> min</p>
                  </div> 
                </div>
                <div>
                  <button onclick="addBtn('${post.title.replace("'"," ")}', ${post.view_count})" class="bg-green-400 p-2 px-[10px] rounded-full"><i class="fa-solid fa-envelope-open-text text-2xl text-white"></i></i></button>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
        
        `
        
        
        parentDiv.appendChild(postArea);
        
        console.log(post);
        const activeStatus = postArea.querySelectorAll(".activeStatus");
        activeStatus.forEach(activeStatus =>{
          if(post.isActive === true){
            activeStatus.classList.add("bg-green-500")
          }
          else if(post.isActive === false){
            activeStatus.classList.add("bg-red-500")
          }
        });
        

    });
    
    const noPost = document.createElement('div');
        noPost.innerHTML = `
          <div id="hello" class="hidden"><h1 class="text-3xl font-bold text-center lg:p-10">No posts found!!!</h1></div>
        `
        parentDiv.appendChild(noPost);
        console.log(allPostArr.length);
        const hello = document.getElementById('hello');
        if(allPostArr.length === 0){
          hello.classList.remove('hidden')
        }
        console.log(allPostArr);
        
}
let num = 0;
const addBtn = (title, views) =>{
    const rightParentDiv = document.getElementById('rightParentDiv');
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="flex bg-white p-3 rounded-2xl">
              <h1 class="text-base font-bold">${title}</h1>
              <div class="flex items-center gap-2">
                <i class="fa-regular fa-eye text-xl text-[#12132D99]"></i>
                <p class="text-lg text-[#12132D99]">${views}</p>
              </div>
            </div>
    `
    rightParentDiv.appendChild(div);
    const count = document.getElementById('count')
    num ++;
    count.innerText = num
}

const latestPost = async() =>{
  const loadingSpiner2 = document.getElementById('loadingSpiner2');
      loadingSpiner2.classList.remove('hidden')
      await new Promise(resolve => setTimeout(resolve, 2000));
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    const latestPost = await res.json()
    const rightParentDiv = document.getElementById('rightParentDive');
    const thePost = latestPost.forEach(perPost =>{
      loadingSpiner2.classList.add('hidden')
        const div = document.createElement('div')
        const postedDAte = perPost.author.posted_date ? perPost.author.posted_date: "No publish date"
        const designation = perPost.author.designation ? perPost.author.designation: "Unknown"
        div.innerHTML = `
        <div class="card h-[500px] bg-base-100 shadow-xl">
                <figure class="px-6 pt-6 max-h-[170px] ">
                  <img  src="${perPost.cover_image}" alt="Shoes" class="rounded-xl" />
                </figure>
                <div class="card-body space-y-3">
                  <p class="flex gap-3 items-center lg:text-xl font-normal"><i class="fa-regular fa-calendar-days "></i><span class="text-[#12132D99]">${postedDAte}</span></p>
                  <h2 class="card-title">${perPost.title}</h2>
                  <p class="text-base font-normal text-[#12132D99]">${perPost.description}</p>
                  <div class="card-actions flex gap-5">
                    <div class="avatar placeholder">
                      <div class="bg-neutral text-neutral-content rounded-full w-12">
                      <img  src="${perPost.profile_image}" alt="Shoes" class="rounded-xl" />
                      </div>
                  </div>
                  <div>
                    <h2 class="text-base font-bold">${perPost.author.name}</h2>
                    <p class="text-[#12132D99] text-sm font-normal">${designation}</p>
                  </div>
                </div>
              </div>
            </div>
        `
        rightParentDiv.appendChild(div)
        console.log(perPost);
    })
}

const searchBtn = async() =>{
  const loadingSpiner = document.getElementById('loadingSpiner');
      loadingSpiner.classList.remove('hidden');
  const searchInput = document.getElementById('searchInput');
  const inputValue = searchInput.value;
  await allData(inputValue);
  loadingSpiner.classList.add('hidden');
}

allData()
latestPost()