const $ = s => document.querySelector(s);
const $$ = ss => document.querySelectorAll(ss);
const searchMAP = {
    'baidu': 'https://www.baidu.com/s?wd=',
    'bing': 'https://cn.bing.com/search?q='
}
let searchType = 'baidu';
$$('.search-type-button').forEach($tab => {
    $tab.onclick = function () {
        $$('.search-type-button').forEach($$tab => $$tab.classList.remove('active'))
        this.classList.add('active')
        searchType = this.dataset.type;//这里对应的就是data-type 
    }
})

//上面是设置对应baidu和bing的搜索 点击百度则用百度 searchType也相应做出变化 以便于后面搜索改变网站
//其次我们在search-type-button中设置的data-type 访问要用dataset.type
$('.icon-search').onclick = search;


document.onkeyup = function (e) {
    if (e.key === 'Enter') {
        search();
    }
}
//当我们按下enter就会自动search 

function search() {
    let url = searchMAP[searchType] + $('.search-input input').value;
    const $link = document.createElement('a');
    $link.setAttribute('href', url);
    $link.setAttribute('target', '_blank');
    $link.click();
}
//简化search 按照规则 百度，bing搜索都是 ...+'搜索内容'
//注意要创建一个a链接 setAtrribute 或者 .href or .target 都是可以的


let currentModify = 0;
let $curModify = null;

let data = []
load();

// const data = [{
//     title: '常用网站',
//     data: [{
//         name: 'jirengu',
//         url: 'https://xiedaimala.com/'
//     },
//     {
//         name: 'baidu',
//         url: 'https://www.baidu.com/'
//     }
//     ]

// },
// {
//     title: '精品博客',
//     data: [{
//         name: 'jirengu',
//         url: 'https://xiedaimala.com/'
//     },
//     {
//         name: 'baidu',
//         url: 'https://www.baidu.com/'
//     }
//     ]

// }]


render(data)

function render(data) {/*
    <li class="item">
    <h2>common website</h2>
            <ul class="panel">
                <li class="tag">baidu</li>
                <li class="tag">zhihu</li>
                <li class="tag">v2ex</li>
           
            </ul>
    </li>
                     */
    const $itemArr = data.map(obj => {
        const $item = document.createElement('li');
        $item.classList.add('item');
        const $h2 = document.createElement('h2');
        $h2.append(obj.title)
        const $ul = document.createElement('ul')
        $ul.classList.add('panel');//classList add不需要加'.'
        const $iconSpan = document.createElement('span');
        $iconSpan.innerHTML = '<svg class="icon icon-delete" aria-hidden="true"><use xlink:href="#icon-delete"></use></svg> <svg class="icon icon-editor" aria-hidden="true"><use xlink:href="#icon-editor"></use></svg>';
        $h2.append($iconSpan);
        let $Arrayli = obj.data.map(item => {
            const $li = document.createElement('li');
            $li.classList.add('tag');
            const $a = document.createElement('a');
            $a.setAttribute('href', item.url);
            $a.setAttribute('target', '_blank');
            $a.append(item.name);
            $li.append($a);
            let $iconDelte = document.createElement('li');
            $iconDelte.classList.add('tag');
            $iconDelte.classList.add('icon-delete_fill');
            $iconDelte.innerHTML = '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-delete_fill"></use></svg>';
            $li.append( $iconDelte);
            return $li;

        })
        $ul.append(...$Arrayli);
        let $icon = document.createElement('li');
        $icon.classList.add('tag');
        $icon.classList.add('icon-add');
        $icon.innerHTML = '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-plus"></use></svg>';
     
        $ul.append($icon);
        $item.append($h2, $ul);
        return $item;


    })

    console.log($itemArr)

    //注意 使用map的时候一定呀return 返回的是最终成型的DOM

    $('.website .list').innerHTML = '';
    $('.website .list').append(...$itemArr);

    //以上为数据到DOM的映射  十分安全

    // $$('.icon-delete').forEach($del => $del.onclick = function(e) {
    //     let $result = e.composedPath().filter($node => $node.classList&&$node.classList.contains('item'))
    //     console.log($result)
    //     if($result.length > 0){
    //         let $item =$result[0];
    //         console.log( $item);
    //         let index = [...$$('.item')].indexOf($item);
    //         console.log(index);
    //         data.splice(index , 1);//splice(start, deleteCount)
    //         render(data);
    //     }
    // }
    // )
}
//每次调用render，都会把原本的内容清空 可以在render（）中加入icon-delete绑定事件 点击后 又重新绑定事件 绑定事件中又有icon-delete 每一次点击玩icon-delete都把原来的内容清空 重新绑定事件

let pageStatus = 'setting';

$('.icon-setting').onclick = function () {
    pageStatus = 'setting'
    $('body').classList.remove('preview');
    $('body').classList.add('setting');
}


$('.icon-back').onclick = function () {
    pageStatus = 'preview'
    $('body').classList.remove('setting');
    $('body').classList.add('preview');
    $('.modal').classList.remove('show');
}

$('.icon-plus').onclick =function(){
    $('.modal').classList.add('show');
}


$('.modal-1 .cancel').onclick =function(){
    $('.modal').classList.remove('show');
}

$('.modal-1 .confirm').onclick =function(){
    let value = $('.modal input').value;
    if(value === ''){
        alert('输入不能为空')
        return;
    }
    let obj = {
        title: value,
        data: []
    }

    data.push(obj);
    render(data);
    
    $('.modal').classList.remove('show');
    save();
 

}





$('.modal-2 .cancel').onclick =function(){
    $('.modal-2').classList.remove('show');
}

$('.modal-2 .confirm').onclick =function(){
    let value = $('.modal-2 input').value;
    if(value === ''){
        alert('输入不能为空')
        return;
    }
   data[currentModify].title = value;
    render(data);
    $('.modal').classList.remove('show');
    save();

}


$('.modal-3 .cancel').onclick =function(){
    $('.modal-3').classList.remove('show');
}

$('.modal-3 .confirm').onclick =function(){
    let name = $('.modal-3 .text-1 input').value;
    let url = $('.modal-3 .text-2 input').value;
    if(name,url === ''){
        alert('输入不能为空')
        return;
    }
    data[currentModify].data.push({name , url})
    render(data);
    save();
   $('.modal-3').classList.remove('show');
}



$('.list').onclick = function(e) {
    let $delete = e.composedPath().find($node => $node.classList&&$node.classList.contains('icon-delete'))
    if($delete){
        let $result = e.composedPath().filter($node => $node.classList&&$node.classList.contains('item'))
        if($result.length > 0){
            let $item =$result[0];
            let index = [...$$('.item')].indexOf($item);
          
            console.log(index);
            data.splice(index , 1);//splice(start, deleteCount)
            render(data);
            save();
        }
    }
    let $editor = e.composedPath().find($node => $node.classList&&$node.classList.contains('icon-editor'));
    if($editor){
        let $result = e.composedPath().filter($node => $node.classList&&$node.classList.contains('item'))
        if($result.length > 0){
            let $item =$result[0];
            let index = [...$$('.item')].indexOf($item);
            console.log(index);
            currentModify = index;
            $curModify = $item;
            $('.modal-2').classList.add('show');
            let title = $item.querySelector('h2').innerText;//注意这里显示文本信息用的是innerText
            $('.modal-2 input').value = title;
        }
    }

    let $add = e.composedPath().find($node => $node.classList&&$node.classList.contains('icon-add'));
    if($add){
        let $result = e.composedPath().filter($node => $node.classList&&$node.classList.contains('item'))
        if($result.length > 0){
            let $item =$result[0];
            let index = [...$$('.item')].indexOf($item);
            currentModify = index;
            $curModify = $item;
            $('.modal-3').classList.add('show');
        }
    }
    // let $delete_fill = e.composedPath().find($node => $node.classList&&$node.classList.contains('icon-delete_fill'));
    // if($delete_fill){
    //     let $result = e.composedPath().filter($node => $node.classList&&$node.classList.contains('item'))
    //     if($result.length > 0){
    //         let $item =$result[0];
    //         let index = [...$$('.item')].indexOf($item);
    //         console.log(index);
    //         currentModify = index;
    //         $curModify = $item;
    //         data[currentModify].data.pop();
    //         console.log( data[currentModify].data);
    //         render(data);
    //         save();
    //     }
    // }
   //


     let $delete_fill = e.composedPath().find($node => $node.classList&&$node.classList.contains('icon-delete_fill'));
    if($delete_fill){
        let $result = e.composedPath().filter($node => $node.classList&&$node.classList.contains('item'))
        if($result.length > 0){
            let $tag = $delete_fill.parentElement;
            let tagArr = [...$tag.parentElement.children];
            let $tagIndex = tagArr.indexOf($tag);
            let $item =$result[0];
            let index = [...$$('.item')].indexOf($item);
            console.log(index);
            currentModify = index;
            $curModify = $item;
            // data[currentModify].data.pop();
            data[currentModify].data.splice($tagIndex,1);
            render(data);
            save();
        }
    }
   
}

//此处用到了事件代理
//事件绑定代理给⽗元素，由⽗元素根据 事件来源 统⼀处理 
//适⽤于可能会新增⼦元素的场景 
//使用e.composedPath()可以查到事件冒泡经过的路径


// $$('.icon-delete').forEach($del => $del.onclick = function(e) {
//     let $result = e.composedPath().filter($node => $node.classList&&$node.classList.contains('item'))
//     console.log($result)
//     if($result.length > 0){
//         let $item =$result[0];
//         console.log( $item);
//         let index = [...$$('.item')].indexOf($item);
//         console.log(index);
//         data.splice(index , 1);//splice(start, deleteCount)
//         render(data);
//     }
// }
// )

//不能直接这么写的原因是 每次重新调用render(data)都会把之前绑定的事件都删掉  render起到的作用是重新绑定


//数据持久化 将原来data设为空
function save() {
    localStorage.setItem('website', JSON.stringify(data))
}

function load() {
    let storagedData = localStorage.getItem('website')
    if(storagedData){
        data = JSON.parse(storagedData)
    }else{
        data= [];
    }

}
