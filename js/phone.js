const loadPhone = async (text='a',isShowAll ) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${text}`);
    const mobile = await res.json();
    displayPhones(mobile.data ,isShowAll);
}

const displayPhones = (phones , isShowAll) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showAllCard = document.getElementById('show-all-card');
    if(phones.length > 12  && !isShowAll){
      showAllCard.classList.remove('hidden')
    }
    else{
      showAllCard.classList.add('hidden')
    }
    
    if(!isShowAll){
      phones = phones.slice(0, 12)
    }
    

    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 py-4 w-96 shadow-x`;

        phoneCard.innerHTML = `
        <figure>
              <img
                src="${phone.image}"
                alt="Shoes" />
        </figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-end">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Detail</button>
              </div>
            </div>
            `;
        phoneContainer.appendChild(phoneCard);
     })

  toggleLoadingSpinner(false);
}

//search field[]
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field')
    const text = searchField.value;
    // console.log(text);
    loadPhone(text, isShowAll)
}

//show button
const handleShowAll = () => {
  handleSearch(true)
}

//show mobile details
const handleShowDetail = async(id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data
  showPhoneDetails(phone)
}

const showPhoneDetails = (phone) =>{
  const phoneName = document.getElementById('show-detail-phone-name');
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
  <br>
   <img src="${phone.image}" alt"">
  <br>
   <p><b>storage : </b>${phone?.mainFeatures?.storage}
   <p><b>displaySize : </b>${phone?.mainFeatures?.displaySize}
   <p><b>memory : </b>${phone?.mainFeatures?.memory}
   <p><b>sensors : </b>${phone?.mainFeatures?.sensors}
  `

  my_modal_1.showModal()
}

//spinner
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden')
  }
  else{
    loadingSpinner.classList.add('hidden')
  }
}

loadPhone();