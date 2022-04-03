const blogContents = document.querySelector("#blog-content");

const loading = document.getElementById("loader");

loading.style.display = "block";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

(async () => {
  const res = await fetch(
    "https://ireadblog.com/api/v1/posts?tag=DevInceptCommunity",
    {
      headers: { Accept: "application/json" },
      mode: "cors",
      method: "GET",
    }
  );
  const json = await res.json();
  if (json.length > 0) {
    Object.entries(json).forEach(([key, value]) => {
      let response = `
        <div class="col-md-4 mb-4">
            <div class="card">
                <img class="blog-card-img" src="https://res.cloudinary.com/dlomjljb6/image/upload/v1/${
                  value.fields.thumbnail
                }" alt="Thumbnail">
                <div class="card-body">
                <h4 class="blog-card-title">${value.fields.title}</h4>
                <div class="views mb-3"><small style="color:grey;">Posted on ${formatDate(
                  value.fields.timestamp
                )} by ${value.fields.author}</small></div>
                <p class="card-text">${value.fields.seo_overview}</p>
                <a href="https://ireadblog.com/posts/${value.pk}/${
        value.fields.slug
      }" class="btn btn-info">Read More</a>
                </div>
                <div class="blog-card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                </div>
            </div>
          </div>
        `;

      loading.style.display = "none";
      blogContents.innerHTML += response;
    });
  } else {
    let response = `<h3 style="text-align: center;align-items: center;"class="text-center">No Blogs Yet</h3>`;

    loading.style.display = "none";
    blogContents.innerHTML += response;
  }
})();
