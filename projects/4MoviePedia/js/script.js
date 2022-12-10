
window.onload = function () {
    let filmid = 0


    $(".loader-cont").hide();

    let moviesFound = false

    $('#movieTitle').on('input', function () {
        moviesFound = false
    })
    $('#movieType').on('input', function () {
        moviesFound = false
    })

    $("#btnFind").click(function () {

        if (moviesFound == false) {
            $(".loader-cont").show();
            let movieTitle = $("#movieTitle").val();
            let movieType = $("#movieType").val();

            $.ajax({
                type: "GET",
                url: `http://www.omdbapi.com/`,
                data: {
                    apikey: '95a57ec1',
                    s: movieTitle,
                    type: movieType,
                },
                success: function (arrMovies) {
                    // console.log(data);
                    if (arrMovies.Response !== 'False') {
                        // $('body').css('background-image', `url(${data.Search[0].Poster})`)
                        $(".loader-cont").hide();

                        $(".movies__cont").html("");

                        for (let i = 0; i < arrMovies.Search.length; i++) {
                            $('.movies__cont').append(`
                                <div class='movie__item'>    
                                    <div class="movie__poster-cont">
                                        <img src="${arrMovies.Search[i].Poster}" class='movie__poster' alt="Movie poster here">
                                    </div>
                                    <div class="movie__info">
                                        <div class="movie__type">${arrMovies.Search[i].Type}</div>
                                        <div class="movie__title">${arrMovies.Search[i].Title}</div>
                                        <div class="movie__release">${arrMovies.Search[i].Year}</div>
                                        <input type="button" class="detailsBtn" value="Details" data-filmId=${filmid++}>
                                    </div>
                                </div>
                            `)
                        }

                        $('.detailsBtn').click(function () {
                            // console.log($(this).attr('data-filmId'));
                            let currentId = $(this).attr('data-filmId')
                            $(".loader-cont").show();

                            $.ajax({
                                type: "GET",
                                url: "http://www.omdbapi.com/",
                                data: {
                                    apikey: '95a57ec1',
                                    t: arrMovies.Search[currentId].Title,
                                    type: movieType,
                                },
                                success: function (separateFilm) {
                                    // console.log(separateFilm);
                                    if (separateFilm.Response !== 'False') {
                                        $(".loader-cont").hide();

                                        $('.movies__modal').css('display', 'block')
                                        $('.movies__modal').append(`
                                        <div class='modal__close'>✖</div>
                                        <div class="modal__title">${movieType} info:</div>
                                        <div class='modal__content'>
                                            <div class="modal__left">
                                                <img src="${separateFilm.Poster}" class="modal__poster" alt="Image not found">
                                            </div>
                                            <div class="modal__right">
                                                <div class='modal__right-items'><span class='modalTh'>Title:</span>${separateFilm.Title}</div>
                                                <div class='modal__right-items'><span class='modalTh'>Released:</span>${separateFilm.Released}</div>
                                                <div class='modal__right-items'><span class='modalTh'>Genre:</span>${separateFilm.Genre}</div>
                                                <div class='modal__right-items'><span class='modalTh'>Country:</span>${separateFilm.Country}</div>
                                                <div class='modal__right-items'><span class='modalTh'>Director:</span>${separateFilm.Director}</div>
                                                <div class='modal__right-items'><span class='modalTh'>Writer:</span>${separateFilm.Writer}</div>
                                                <div class='modal__right-items'><span class='modalTh'>Actors:</span>${separateFilm.Actors}</div>
                                                <div class='modal__right-items'><span class='modalTh'>Awards:</span>${separateFilm.Awards}</div>
                                            </div>
                                        </div>
                                        `)

                                        $('.modal__close').click(function () {
                                            $('.movies__modal').html("")
                                            $('.movies__modal').css('display', 'none')

                                        })
                                    } else {
                                        alert('Failed to load information')
                                    }
                                }
                            });


                        })

                    } else {
                        alert('Movie not found!')
                        $(".loader-cont").hide();
                    }

                    moviesFound = true
                }

            });
        }
    });
}

