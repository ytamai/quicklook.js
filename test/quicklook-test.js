describe('mouseover',function(){
  beforeEach(function(){
    var testbody=document.body;
    var testimg=document.createElement('img');
        testimg.src='../sample/images/quicklook-sample.jpg';
        testimg.alt='alttext';
    var testdiv=document.createElement('div');
        testdiv.className='test-quicklook';
        testdiv.appendChild(testimg);
    testbody.appendChild(testdiv);
    quickLook('test-quicklook','_large');
    function mouseover(el){
        var ev = document.createEvent("MouseEvent");
        ev.initMouseEvent(
            "mouseover",
            true /* bubble */, true /* cancelable */,
            window, null,
            0, 0, 0, 0, /* coordinates */
            false, false, false, false, /* modifier keys */
            0 /*left*/, null
        );
        el.dispatchEvent(ev);
    }
    mouseover(document.body.lastChild);
  });
  it('quickLook>imgのsrcに_largeが含まれるか',function(){
    var testobj=document.body.lastChild.lastChild;
    expect(testobj.firstChild.src).toMatch('_large');
  });
  it('quickLook>pとトリガーのaltは等しいか',function(){
    var testobj=document.body.lastChild.lastChild;
    var trgobj=document.getElementsByClassName('test-quicklook');
    expect(testobj.lastChild.innerHTML).toBe(trgobj[0].firstChild.alt);
  })
});