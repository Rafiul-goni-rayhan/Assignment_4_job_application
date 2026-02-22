let jobList = [
  {
    id: 1,
    company: "Mobile First Corp",
    role: "React Native Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$100k - $115k",
    description: "Build cross-platform mobile applications.",
    applicationStatus: "All",
  },
  {
    id: 2,
    company: "WebFlow Agency",
    role: "Web Designer & Developer",
    location: "Los Angeles, CA",
    type: "Part-time",
    salary: "$80k - $100k",
    description: "Create stunning web experiences.",
    applicationStatus: "All",
  },
  {
    id: 3,
    company: "DataViz Solutions",
    role: "Data Visualization Specialist",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$110k - $130k",
    description: "Transform complex data into visualizations.",
    applicationStatus: "All",
  },
  {
    id: 4,
    company: "CloudFirst Inc",
    role: "Backend Developer",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$140k - $160k",
    description: "Design scalable backend systems.",
    applicationStatus: "All",
  },
  {
    id: 5,
    company: "Innovation Labs",
    role: "UI/UX Engineer",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110k - $130k",
    description: "Create beautiful user interfaces.",
    applicationStatus: "All",
  },
  {
    id: 6,
    company: "MegaCorp Solutions",
    role: "JavaScript Developer",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130k - $150k",
    description: "Build enterprise applications.",
    applicationStatus: "All",
  },
  {
    id: 7,
    company: "StartupXYZ",
    role: "Full Stack Engineer",
    location: "Remote",
    type: "Full-time",
    salary: "$140k - $160k",
    description: "Join our fast-growing startup.",
    applicationStatus: "All",
  },
  {
    id: 8,
    company: "TechCorp Industries",
    role: "Senior Frontend Developer",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$150k - $175k",
    description: "Build reliable web applications.",
    applicationStatus: "All",
  },
];

let activeTab = "All";

const jobContainer = document.getElementById("job-list");
const emptyState = document.getElementById("empty-state");
const tabCountDisplay = document.getElementById("tab-count");

function renderJobCards() {
  const filteredJobs =
    activeTab === "All"
      ? jobList
      : jobList.filter((job) => job.applicationStatus === activeTab);

  jobContainer.innerHTML = "";
  tabCountDisplay.innerText = filteredJobs.length;

  //empty state handling
  if (filteredJobs.length === 0) {
    jobContainer.classList.add("hidden");
    emptyState.classList.remove("hidden");
  } else {
    jobContainer.classList.remove("hidden");
    emptyState.classList.add("hidden");

    // add card using loop
    filteredJobs.forEach((singleJob) => {
      const card = createJobCardHTML(singleJob);
      jobContainer.innerHTML += card;
    });
  }

  updateDashboardStats();
}

//eikahne card er html banabo
function createJobCardHTML(job) {
  const isInterview = job.applicationStatus === "Interview";
  const isRejected = job.applicationStatus === "Rejected";
  let badgeClass = "hidden";
  if (isInterview)
    badgeClass = "bg-green-100 text-green-700 border border-green-200";
  if (isRejected) badgeClass = "bg-red-100 text-red-700 border border-red-200";

  return `
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative group hover:border-blue-200 transition-all">
        <button onclick="deleteJobEntry(${job.id})" class="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-gray-400 border border-gray-200 rounded-full hover:text-red-500 hover:border-red-500 transition-all cursor-pointer">
            <i class="fa-solid fa-trash-can text-xs"></i>
        </button>
        
        <h3 class="text-lg font-bold text-gray-800">${job.company}</h3>
        <p class="text-gray-500 font-medium text-sm mb-3">${job.role}</p>
        
        <div class="flex flex-wrap gap-x-2 gap-y-1 text-xs text-gray-400 mb-4 font-medium uppercase tracking-wider">
            <span>${job.location}</span> • <span>${job.type}</span> • <span>${job.salary}</span>
        </div>
        
        <div class="mb-4 ${job.applicationStatus === "All" ? "hidden" : "block"}">
            <span class="${badgeClass} text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
                ${job.applicationStatus}
            </span>
        </div>

        <p class="text-gray-600 text-sm mb-6 leading-relaxed">${job.description}</p>
        
        <div class="flex gap-3">
            <button onclick="toggleJobStatus(${job.id}, 'Interview')" 
                class="px-4 py-1.5 border border-green-500 rounded text-xs font-bold uppercase transition-all cursor-pointer 
                ${isInterview ? "bg-green-500 text-white" : "text-green-600 hover:bg-green-50"}">
                Interview
            </button>
            <button onclick="toggleJobStatus(${job.id}, 'Rejected')" 
                class="px-4 py-1.5 border border-red-500 rounded text-xs font-bold uppercase transition-all cursor-pointer 
                ${isRejected ? "bg-red-500 text-white" : "text-red-600 hover:bg-red-50"}">
                Rejected
            </button>
        </div>
    </div>
  `;
}

//tab filter function
function filterJobs(tabName) {
  activeFilter = tabName;
  const tabs = ["All", "Interview", "Rejected"];
  tabs.forEach((t) => {
    const btn = document.getElementById(`btn-${t.toLowerCase()}`);
    if (t === tabName) {
      btn.className =
        "px-6 py-2 rounded-md bg-blue-600 text-white font-medium shadow-md transition-all cursor-pointer";
    } else {
      btn.className =
        "px-6 py-2 rounded-md bg-white text-gray-500 border border-gray-200 font-medium hover:bg-gray-50 transition-all cursor-pointer";
    }
  });

  activeTab = tabName;
  renderJobCards();
}

//status change kora

function toggleJobStatus(id, newStatus) {
  const targetJob = jobList.find((job) => job.id === id);
  if (targetJob) {
    targetJob.applicationStatus = newStatus;
    renderJobCards();
  }
  // console.log(targetJob);
}

//deshbord update

function updateDashboardStats() {
  document.getElementById("total-count").innerText = jobList.length;
  document.getElementById("interview-count").innerText = jobList.filter(
    (job) => job.applicationStatus === "Interview",
  ).length;
  document.getElementById("rejected-count").innerText = jobList.filter(
    (job) => job.applicationStatus === "Rejected",
  ).length;
}
//delete job

function deleteJobEntry(id) {
  jobList = jobList.filter((job) => job.id !== id);
  renderJobCards();
}
renderJobCards();
