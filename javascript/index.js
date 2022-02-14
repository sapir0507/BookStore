$(document).ready(function(){
    console.log("ready")
    var searchData, item, title, author, publisher, summery, bookLink, BookImg;
    var placeHolder = 'https://via.placeholder.com/300'
    var outputList = document.getElementById("Results")
    var bookUrl = `https://www.googleapis.com/books/v1/volumes?q=`

    $("#search_btn").click(function(e){
        e.preventDefault();
        outputList.innerHTML = ""
        searchData = $("#search_box").val()
        console.log(searchData)
        /*handling empy search input field*/
        if(searchData === "" || searchData === null){
            console.log("empty search")
            displayError();
            outputList.innerHTML = `
            <h2 style="text-align=center;">Empty Search</h2>
           `
        } 
        else
        {
            console.log("starting ajax request")
            $.ajax({
                url: bookUrl + searchData,
                dataType: "json",
                success: function(res){
                    console.log(res)
                    if(Response.totalItem===0){
                        console.log("No Results...")
                    }
                    else{
                        console.log("Results found. Display results.")
                        displayResults(res);
                    }
                },
                error: function(){
                    console.log("something went wrong")
                }
            });
        }
        $("#search_box").val("")
    })
    
    //handle the result google api returns through the ajax request
    const displayResults = (res) => {
        var size = res.items.length < 10 ? res.items.length : 10
        for(var i = 0; i < size; i+=2){

            outputList.innerHTML += "<div class='Results__pair'>"

            item = res.items[i];
            title = item.volumeInfo.title;
            author = item.volumeInfo.authors;
            publisher = item.volumeInfo.publisher;
            summery = item.searchInfo.textSnippet;
            bookLink = item.searchInfo.previewLink;
            BookImg = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHolder;
            bookIsbn = item.volumeInfo.industryIdentifiers[1].identifier;

            outputList.innerHTML += formatOutput(BookImg, title, author, publisher, summery, bookLink, bookIsbn)

            item = res.items[i+1];
            title = item.volumeInfo.title;
            author = item.volumeInfo.authors;
            publisher = item.volumeInfo.publisher;
            summery = item.searchInfo.textSnippet;
            bookLink = item.searchInfo.previewLink;
            BookImg = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHolder;
            bookIsbn = item.volumeInfo.industryIdentifiers[1].identifier;

            outputList.innerHTML += formatOutput(BookImg, title, author, publisher, summery, bookLink, bookIsbn)
            outputList.innerHTML += "</div>"
        }
    }

    const formatOutput = (BookImg, title, author, publisher, summery, bookLink /*for later*/, bookIsbn) => {
        // var viewerUrl = "book.html?isbn=" + bookIsbn
        var htmlCard = `
        <div class="Results__counter">
        <div class="card mb-3" style="max-width: 540px; width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src=${BookImg}
                class="img-fluid rounded-start" 
                alt="..."/>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">
                    <b>Author:</b>  ${author}<br/>
                    <b>Publisher:</b>  ${publisher}<br/>
                    <br/>
                    <b>Summery:</b>  ${summery}
                  </p>
                </div>
              </div>
            </div>
          </div>
    </div>
    `
    //<a target="_black" href="${viewerUrl}" class="btn btn-secondary">Read</a>
    return htmlCard;
    }

    //handling Error displaying an empty result page
    const displayError = () => {
        console.log("user forgot to put input in the search box")
    }

})