import React from 'react';
import stl from './Fight.styl';

class Fight extends React.Component {
 componentWillMount(){
   const chat = document.querySelector('#mes');
   chat?
   chat.scollTo(1000):
   console.log(chat);
   //alert('test')
 }
 render(){
  return(
    <div className={stl.slice}>
      <div className={stl.top}>
        <div className={stl.feedback}><span>120</span><a href="#">👍</a><a href="#">👎</a><span>0</span></div>
        <h1>СПОР на погоду</h1>
        <div className={stl.smart}>
          <h3 className={stl.cp}>в споре:<br /><span>1.000 $</span></h3>
          <h3 className={stl.cl}>до закрытия:<br /><span>00:30:55</span></h3>
        </div>
        <p>пару предложений о регламенте пари, сроках проведения и свякой прочей хуерги которую можно развернуть и почитать очень подробно по ссылке<span> <a href="#">подробнее</a></span></p>
      </div>
      <div className={stl.body}>
        <h1><a href="#">Маша
            </a><span>&nbsp; VS &nbsp;</span><a href="#">Петя
            </a></h1>
        <div className={stl.sides}>
          <div className={stl.side1}>
            <div className={[stl.ts, stl.lr].join(' ')}>ЗА</div>
            <div className={stl.chat}>
              <div className={stl.nam}>обсуждение</div>
              <div id='mes' className={stl.mesblock}>
                <div className={stl.mes}> <small>от <a href="#">Маши </a></small>
                  <p>ставка 20$</p>
                </div>
                <div className={stl.mes}> <small>от <a href="#">Маши </a></small>
                  <p>ставка 20$</p>
                </div>
                <div className={stl.mes}> <small>от <a href="#">Маши </a></small>
                  <p>ставка 20$</p>
                </div>
                <div className={stl.mes}> <small>от <a href="#">Маши </a></small>
                  <p>ставка 20$</p>
                </div>
                <div className={stl.mes}> <small>от <a href="#">Маши </a></small>
                  <p>ставка 20$</p>
                </div>
                <div className={stl.mes}> <small>от <a href="#">Маши </a></small>
                  <p>ставка 20$</p>
                </div>
                <div className={stl.mes}> <small>от <a href="#">Маши </a></small>
                  <p>ставка 20$</p>
                </div>
                <div className={stl.mes}> <small>от <a href="#">Маши </a></small>
                  <p>ставка 20$</p>
                </div>
                <div className={stl.mes}> <small>от <a href="#">Маши </a></small>
                  <p>ставка 20$</p>
                </div>
                <div className={stl.mes}> <small>от <a href="#">Маши </a></small>
                  <p>ставка 20$</p>
                </div>
              </div>
            </div>
            <div className={stl.users}>
              <div className={stl.nam}>игроки 21 чел</div>
              <div className={stl.content}>
                <div className={stl.us}><img src="https://randomuser.me/api/portraits/women/0.jpg" /><span>9$</span></div>
                <div className={stl.us}><img src="https://randomuser.me/api/portraits/women/1.jpg" /><span>5$</span></div>
                <div className={stl.us}><img src="https://randomuser.me/api/portraits/women/2.jpg" /><span>1$</span></div>
                <div className={stl.us}><img src="https://randomuser.me/api/portraits/women/3.jpg" /><span>21$</span></div>
                <div className={stl.us}><img src="https://randomuser.me/api/portraits/women/4.jpg" /><span>30$</span></div>
                <div className={stl.us}><img src="https://randomuser.me/api/portraits/women/5.jpg" /><span>30$</span></div>
                <div className={stl.us}><img src="https://randomuser.me/api/portraits/women/6.jpg" /><span>28$</span></div>
                <div className={stl.us}><img src="https://randomuser.me/api/portraits/women/7.jpg" /><span>19$</span></div>
                <div className={stl.us}><img src="https://randomuser.me/api/portraits/women/8.jpg" /><span>7$</span></div>
                <div className={stl.us}><img src="https://randomuser.me/api/portraits/women/9.jpg" /><span>17$</span></div>
              </div>
            </div>
            <div className={stl.calc}>
              <div className={stl.nam}>сделать ставку</div>
              <div className={stl.content}>
                <input placeholder="текст..." /><span>⬈120฿</span>
              </div>
            </div>
          </div>
          <div className={stl.side2}>
            <div className={[stl.ts, stl.lf].join(' ')}>ПРОТИВ</div>
            <div className={stl.chat}>
              <div className={stl.nam}>обсуждение</div>
            </div>
            <div className={stl.users}>
              <div className={stl.nam}>игроки</div>
            </div>
            <div className={stl.calc}>
              <div className={stl.nam}>сделать ставку</div>
            </div>
          </div>
        </div>
      </div>
      <div className={stl.bottom}>
        <p>что-нибудь про пожаловаться на спор</p>
      </div>
    </div>
  );
 }
}

export default Fight;
