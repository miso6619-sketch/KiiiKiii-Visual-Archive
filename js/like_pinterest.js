$(function() {
    //선택자 전역 변수
    const $section = $('section');
    const $articles = $('article'),
          $btns = $('main ul li');

    const speed = '0.5s'
    const activeClass = 'on'

    let grid; //Isope 플러그인의 정보값이 담길 변수

    //모든 콘텐츠 로딩완료되면
    $(window).on('load', function() {
        init();//화면 초기화 함수
        filter(); //필터버튼 기능함수
    })
    //화면초기화 함수
    function init() {
        //section 안에 있는 article을 보기 좋게 정렬
        grid = new Isotope($section.get(0) , {
            itemSelector: 'article',
            columnWidth: 'article',
            transitionDuration: speed
        })
    }

    //정렬 버튼 기능
    function filter() {
        $btns.on('click', function(e) {
            e.preventDefault();

            //클릭한 a의 속성 href를 sort 변수에 저장
            const sort = $(this).find('a').attr('href');

            grid.arrange({filter:sort}) //isotope에서 arrange는 정렬함수

            $btns.removeClass(activeClass);
            $(this).addClass(activeClass);
        })
    }

})