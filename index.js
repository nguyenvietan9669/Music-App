const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.player')
const playlist = $(".list-music")
const audio = $('#audio')
const thumb = $('.cd-thumb')
const cd = $('.cd')
const musicName = $('h2')
const btnPlay = $('.icon-play')
const btnPause = $('.icon-pause')
const progress = $('#progress')
const btnNext = $('.btn-next')
const btnPrev = $('.btn-prev')
const btnRandom = $('.btn-random')
const btnRepeat = $('.btn-repeat')


const app = {
    currentIndex : 0,
    isPlay : false,
    isRandom : false,
    isRepeat : false,
    listSong :[],
    songs: [
        {
          name: "Lời tạm biệt chưa nói ",
          singer: " GREY-D, Orange",
          path: "./assets/audio/LoiTamBietChuaNoi-GREYDDoanTheLanOrange-7613756.mp3",
          image: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2022/08/01/b/e/a/1/1659321743301_600.jpg"
        },
        {
          name: "đứa nào làm em buồn?   ",
          singer: " Phúc Du, Hoàng Dũng",
          path: "./assets/audio/DuaNaoLamEmBuon-PhucDuHoangDungTheVoice-7672637.mp3",
          image:
            "https://avatar-ex-swe.nixcdn.com/song/2022/08/09/7/f/a/3/1660029092264.jpg"
        },
        {
          name: "hai mươi hai (22)",
          singer: " Hứa Kim Tuyền, AMEE",
          path:"./assets/audio/HaiMuoiHai22-HuaKimTuyenAMEE-7231237.mp3",
          image: "https://avatar-ex-swe.nixcdn.com/song/2022/05/24/9/6/e/a/1653363505428.jpg"
        },
        {
          name: "Ánh Sao Và Bầu Trời ",
          singer: "T.R.I",
          path: "./assets/audio/AnhSaoVaBauTroi-TRI-7085073.mp3",
          image:
            "https://avatar-ex-swe.nixcdn.com/song/2021/09/09/f/c/f/d/1631155238247.jpg"
        },
        {
          name: "Một Ngàn Nỗi Đau",
          singer: "Văn Mai Hương, Hứa Kim Tuyền",
          path: "./assets/audio/MotNganNoiDau-VanMaiHuongHuaKimTuyen-7561897.mp3",
          image:
            "https://avatar-ex-swe.nixcdn.com/song/2022/06/22/2/2/2/d/1655884422688.jpg"
        },
        {
          name: "Chuyện Đôi Ta",
          singer: "Emcee L (Da LAB), Muộii",
          path:
            "./assets/audio/ChuyenDoiTa-EmceeLDaLAB-7120974.mp3",
          image:
            "https://avatar-ex-swe.nixcdn.com/song/2021/11/25/8/7/5/6/1637809824703.jpg"
        },
        {
          name: "Quên Anh Đi",
          singer: "MONO",
          path: "./assets/audio/QuenAnhDi-MONO-7665613.mp3",
          image:
            "https://avatar-ex-swe.nixcdn.com/song/2022/08/03/f/9/e/9/1659499292236.jpg"
        },
        {
            name: "Duyên Ta Trời Lấy",
            singer: "Bon",
            path: "./assets/audio/DuyenTaTroiLay-Bon-7662550.mp3",
            image:
              "https://avatar-ex-swe.nixcdn.com/song/2022/07/29/f/3/a/4/1659068888217.jpg"
        },
        {
            name: "dằm trong tim",
            singer: "Suni Hạ Linh, TDK",
            path: "./assets/audio/DamTrongTim-SuniHaLinhTDK-7613753.mp3",
            image:
              "https://avatar-ex-swe.nixcdn.com/song/2022/07/21/a/a/7/5/1658391663646.jpg"
        },
        {
            name: "Vì Mẹ Anh Bắt Chia Tay",
            singer: "Miu Lê, Karik, Châu Đăng Khoa",
            path: "./assets/audio/ViMeAnhBatChiaTay-MiuLe-7503053.mp3",
            image:
              "https://avatar-ex-swe.nixcdn.com/song/2022/06/16/d/c/9/2/1655371095601.jpg"
        }
    ],
      
    render: function() {
    const html = this.songs.map((song,index) => {
        return `<div class="music-item  ${index === this.currentIndex ? "active" : ""}"
            data-index = ${index}
        >
            <div class="thumb" style="background-image:url(${song.image})"></div>
            <div class="body">
                <div class="title">${song.name}</div>
                <div class="author">${song.singer}</div>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>`
    })
    playlist.innerHTML = html.join("")
    },

    defineProperty: function () {
        Object.defineProperty(this,"currentSong",{
        get: function() {
            return this.songs[this.currentIndex]
        }
        })
    },

    ramdomSong : function () {
        let newSong
        do {
            newSong = Math.floor(Math.random() * this.songs.length)
        }while(newSong === this.currentIndex || this.listSong.includes(newSong))
        this.listSong.push(newSong)
        if(this.listSong.length === this.songs.length){
            this.listSong = []
        }
        this.currentIndex = newSong
    },

    loadCurrentSong: function () {
        audio.src = this.currentSong.path
        thumb.style.backgroundImage  = `url(${this.currentSong.image})`
        musicName.textContent = this.currentSong.name
    },

    scrollToActiveSong: function () {
        setTimeout(() => {
            if(this.currentIndex < 3){
                $(".music-item.active").scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                  });
            }else{
                $(".music-item.active").scrollIntoView({
                  behavior: "smooth",
                  block: "nearest"
                });
            }
        }, 300);
    },

    listenEvent : function() {
        const cdWidth = cd.offsetWidth
        playlist.onclick = (e) => {
            const musicElement = e.target.closest(".music-item:not(.active)")
            if(musicElement || e.target.closest('.fa-ellipsis-h')){
                if(musicElement){
                    this.currentIndex = Number(musicElement.dataset.index)
                    this.loadCurrentSong()
                    this.render()
                    audio.play()
                }
            }
        }

        audio.ontimeupdate = () => {
            percent =  audio.currentTime/audio.duration * 100
            progress.value = percent ? percent : 0
        }

        progress.onchange = (e) => {
            audio.pause()
            audio.currentTime = e.target.value/100 * audio.duration
            audio.play()
        }

        const rotateThumb = cd.animate([{transform :'rotate(360deg)'}],{
            duration:10000,
            iterations: Infinity
        })
        rotateThumb.pause()

        document.onscroll = () => {
            let newWidth = window.scrollY || window.screenTop
            cd.style.width = cdWidth-newWidth > 0 ?`${cdWidth-newWidth}px`: 0
        }

        document.onkeydown = (e) => {
            if(e.keyCode === 32) {
                if(this.isPlay === false){
                    audio.play()
                    this.isPlay = true
                }else {
                    audio.pause()
                    this.isPlay = false
                }
            }
        }

        btnPlay.onclick = () => {
            audio.play()
        }

        btnPause.onclick = () => {
            audio.pause()
        }

        btnNext.onclick = () => {
            this.nextSong()
        }

        btnPrev.onclick = () => {
            this.prevSong()
        }

        btnRandom.onclick = () => {
            this.isRandom = !this.isRandom
            btnRandom.classList.toggle('active',this.isRandom)
        }

        btnRepeat.onclick = () => {
            this.isRepeat = !this.isRepeat
            btnRepeat.classList.toggle('active',this.isRepeat)

        }

        audio.onplay = () => {
            this.isPlay = true;
            rotateThumb.play()
            player.classList.add('playing')
        }

        audio.onpause = () => {
            this.isPlay = false
            rotateThumb.pause()
            player.classList.remove('playing')
        }

        audio.onended = () => {
            if(this.isRepeat){
                audio.play()
            }else {
                this.nextSong()
            }
        }
    },

    
    nextSong: function () {
        if(this.isRandom){
            this.ramdomSong()
        }else{
            this.currentIndex ++
            if(this.currentIndex >= this.songs.length){
                this.currentIndex = 0
            }
        }
        this.loadCurrentSong()
        this.render()
        this.scrollToActiveSong()
        audio.play()
    },

    prevSong: function() {
        if(this.isRandom){
            this.ramdomSong()
        }else{
            this.currentIndex--
            if(this.currentIndex <0){
                this.currentIndex = this.songs.length - 1
            }
        }
        this.loadCurrentSong()
        this.render()
        this.scrollToActiveSong()
        audio.play()
    },

    start:function() {
        this.render()
        this.defineProperty();
        this.loadCurrentSong();
        this.listenEvent();
    }
}

app.start()
