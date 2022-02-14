$(document).ready(function(){
    console.log("ready")
    var searchData, item;
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
        var item1, title1, author1, publisher1, summery1, bookLink1, BookImg1;
        var item2, title2, author2, publisher2, summery2, bookLink2, BookImg2;
        var size = res.items.length < 10 ? res.items.length : 10
        for(var i = 0; i < size; i+=2){

            item1 = res.items[i];
            title1 = item1.volumeInfo.title;
            author1 = item1.volumeInfo.authors;
            publisher1 = item1.volumeInfo.publisher;
            summery1 = item1.searchInfo.textSnippet;
            bookLink1 = item1.searchInfo.previewLink;
            BookImg1 = (item1.volumeInfo.imageLinks) ? item1.volumeInfo.imageLinks.thumbnail : placeHolder;
            bookIsbn1 = item1.volumeInfo.industryIdentifiers[1].identifier;

            item2 = res.items[i+1];
            title2 = item2.volumeInfo.title;
            author2 = item2.volumeInfo.authors;
            publisher2 = item2.volumeInfo.publisher;
            summery2 = item2.searchInfo.textSnippet;
            bookLink2 = item2.searchInfo.previewLink;
            BookImg2 = (item2.volumeInfo.imageLinks) ? item2.volumeInfo.imageLinks.thumbnail : placeHolder;
            bookIsbn2 = item2.volumeInfo.industryIdentifiers[1].identifier;

            outputList.innerHTML += ` <div class='Results__pair'> 
                                        <li> ${formatOutput(BookImg1, title1, author1, publisher1, summery1, bookLink1, bookIsbn1)} </li>
                                        <li> ${formatOutput(BookImg2, title2, author2, publisher2, summery2, bookLink2, bookIsbn2)} </li>
                                      </div>`
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