import * as config from './config';
import { constructWidgets, getConfig } from './widget_utils';


export const constructSlider = el => {
  el.class = el.class;    // bring forward (ie, trigger) application of CSS styles
  
  const track_bgEl = el.getElementById('track_bg')
  const trackEl = el.getElementById('track');
  const markerEl = el.getElementById('marker');
  
  
  ////Experimental, not working, yet
  //// TODO is this a scope-thing? expose the exposing?
  //const subs = ['track_bg', 'track', 'marker']
  ////iterate i
  // for(let i=0; i<subs.length; i++)
  // {
  //   const sub = subs[i]
  //   const subEl = sub + 'El'
  //   let accessor = sub + 'Accessor';
  //   console.log(JSON.stringify(accessor));
  //   console.log("sub: " + sub)
  //   //const accessor = sub + 'Accessor';
  //   const accessor = {
  //     get style() {
  //       return subEl.style;
  //       
  //     } 
  //   };
  //   console.log(JSON.stringify(accessor));
  //   console.log(subEl)
  //   Object.defineProperty(el, "'"+sub+"'", {
  //     get() {return accessor;}
  //   });
  // }
  
  ////forEach
  // subs.forEach(e => {
  //   let accessor = e+'Accessor';
  //   console.log("Accessor: "+ accessor)
  //  
  //   let targetEl = e+'El';
  //   console.log('e: ' +e);
  //   console.log("targetEl: " + targetEl)
  //   
  //   const accessor = {
  //     get style() {
  //       return targetEl.style; 
  //     } 
  //   };
  //   
  //   //console.log("Accessor: "+ JSON.stringify(targetEl.style));
  //   Object.defineProperty(el, "'"+e+"'", {
  //     get() {return accessor;}
  //     
  //   });
  //   console.log(e.style)
  //   //console.log(e+".style.fill:" + e.style.fill)
  // })
 
  
  //get style properties on an accessor-variable and pass them to el.El
  const trackAccessor = {
    get style() {
      return trackEl.style;
    }
  };
  Object.defineProperty(el, 'track', {
    get() {return trackAccessor;}
  });
  
  const track_bgAccessor = {
    get style() {
      return track_bgEl.style;
    }
  };
  Object.defineProperty(el, 'track_bg', {
    get() {return track_bgAccessor;}
  });
  
  const markerAccessor = {
    get style() {
      return markerEl.style;
    }
  };
  Object.defineProperty(el, 'marker', {
    get() {return markerAccessor;}
  });
  
  console.log(trackEl.parent.id + ".track.style.fill: " + trackEl.style.fill);
  
  
  
  let _value = 0
  let _listener   // onchange event listener (handler)

  // Because the following attributes are set only when the widget is constructed, they won't respond to subsequent changes.
  let _min = 0, _max = 100

  const config = getConfig(el);
  for (const name in config) {
    const value = Number(config[name]);   // convert to Number here because the only allowed values are numbers
    switch(name) {
      case 'min':
        _min = value;
        break;
      case 'max':
        _max = value;
        break;
    }
  }
  //adjust rounding differences (??)
  _min -= _max / 66;
  _max += _max / 66;
  
  el.getElementById('touch').onmousemove = onMouseMove

  function onMouseMove(evt) {    // TODO 1 take radius and track width into account
    // TODO 2 inefficient: precompute infrequently-changing values
    // TODO 1 screenX doesn't seem to register whole range of values
    // TODO 2 implement 'step' and round to it
    trackEl.width = evt.screenX - el.x
    markerEl.cx = evt.screenX - el.x
   
    _value = Math.round((evt.screenX - el.x) / el.width * (_max - _min) + _min)
    //console.log(`x=${evt.screenX} el=${el.x} val=${value}`)
    if (_listener) _listener(_value)
  }
  
  
  Object.defineProperty(el, 'onchange', {
    set(listener) {
      _listener = listener
    }
  });

  Object.defineProperty(el, 'value', {
    get() {
      return _value
    }
  });
}


export const constructSliders = parentEl => {
  // Constructs all slider widgets within parentEl ElementSearch.
  constructWidgets('slider', constructSlider);
}

if (config.autoConstruct) constructSliders();
