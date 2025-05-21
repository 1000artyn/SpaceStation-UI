<script>
    const newsStories = [
        "Multivac still quiet on entropy, claims: &quot;There is as yet insufficient data for a meaningful answer&quot;",
        "Redshirts demand hazard pay: &quot;Stop beaming us down first!&quot;",
        "Man-kzin war still raging, Kzin ambassador quoted as saying &quot;Meow&quot;",
        "Gethen to join the Ekumen confederation",
        "Kessel Run traffic backed up - pilots blame imperial checkpoints",
        "Sandworm sightings driving up spice prices",
        "Midichlorians found to be traceable with smart watches"
    ];
    let newsStoriesString = newsStories.join('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
    newsStoriesString = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + newsStoriesString;
</script>

<div class="news-scroller">
    <h5>Galactic News</h5>
    <div class="scroll-left">
        <div class="scroll-text-position">
            <p>{@html newsStoriesString}</p>
            <p class="scroll-left-text-two">{@html newsStoriesString}</p>
        </div>
    </div>
</div>

<style>
    h5 {
        width: 180px;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 2;
        background: #f79225;
        margin: 0;
        height: 50px;
        border: 1px solid #f79225;
        text-align: center;
        line-height: 50px;
        font-size: 20px;
        font-family: 'Orbitron', sans-serif;
        @media only screen and (max-width: 900px) {
            width: 150px;
            font-size: 16px;
        }
    }
    .news-scroller {
        position: fixed;
        bottom: 0;
        right: 0;
        width: 100%;
        @media only screen and (max-width: 600px) {
            display: none;
        }
    }
    .scroll-left {
        height: 50px;	
        overflow: hidden;
        position: relative;
        background: #000;
        color: #f79225;
        border: 1px solid #f79225;
    }
    .scroll-left p {
        position: fixed;
        width: auto;
        height: 100%;
        margin: 0;
        line-height: 50px;
        text-align: center;
        animation: scroll-left 100s linear infinite;
        font-family: 'Orbitron', sans-serif;
        font-size: 18px;
        white-space: nowrap;
        font-weight: 600;
        @media only screen and (max-width: 900px) {
            font-size: 16px;
        }
    }
    .scroll-left-text-two {
        transform: translateX(100%);
        animation-delay: 50s !important;
    }
    @keyframes scroll-left {
        0%   {
        transform: translateX(100%); 		
        }
        100% {
        transform: translateX(-100%); 
        }
    }
    .scroll-text-position {
        transform: translateX(-150%);
        @media only screen and (max-width: 1700px) {
            transform: translateX(-180%);
        }
        @media only screen and (max-width: 1600px) {
            transform: translateX(-200%);
        }
        @media only screen and (max-width: 1400px) {
            transform: translateX(-220%);
        }
        @media only screen and (max-width: 1300px) {
            transform: translateX(-250%);
        }
        @media only screen and (max-width: 1200px) {
            transform: translateX(-300%);
        }
        @media only screen and (max-width: 1100px) {
            transform: translateX(-350%);
        }
        @media only screen and (max-width: 1000px) {
            transform: translateX(-380%);
        }
        @media only screen and (max-width: 800px) {
            transform: translateX(-420%);
        }
        @media only screen and (max-width: 700px) {
            transform: translateX(-520%);
        }
    }
</style>