enchant();

window.onload = function() {
  var core = new Core(320, 640);

  core.fps = 24;
  core.preload('chara1.png');
  core.preload('map0.png');
  
  // ページのロードが完了後、実行される。
  core.onload = function() {
    
    console.log('A Core object has been created as ' + core.width + ' x ' + core.height + ' .');
    
    // スペースキーをAボタンにバインド
    core.keybind(0x20, 'a');
    
    
    
    
    
    // Playerキャラを生成
    var bear = new Sprite(32, 32);
    bear.image = core.assets['chara1.png'];
    core.rootScene.addChild(bear);
    
    
    // Mapを生成
    // マップチップサイズは16x16
    var stagemap = new Map(core.width / 16, core.height / 16);
    stagemap.image = core.assets['map0.png'];
    
    
    console.log('A Map object has been created as ' + stagemap.width + ' x ' + stagemap.height + ' chips .');

    // Playerキャラのプロパティ値を設定
    
    
    //
    // Characterの属性情報を設定
    //   integer x: 画面上のX座標
    //   integer y: 画面上のY座標
    //   integer xv: X軸方向への移動量
    //   integer yv: Y軸方向への移動量
    //   integer xmin: X軸の最小値（左端限界の座標）
    //   integer xmax: X軸の最大値（右端限界の座標）
    //   integer ymin: Y軸の最小値
    //   integer ymax: X軸の最大値

    //   boolean isJumping: ジャンプ中かどうかを表すフラグ
    //   
    
    
    bear.frame = 0;
    bear.tick = 0;
    bear.x = 0;
    bear.y = 608;
    bear.xv = 4;
    bear.yv = 0;
    bear.yjumpmax = -80;
    bear.yjumped = 0;
    
    bear.xmin = 0;
    bear.xmax = 280;
    bear.ymin = 20;
    bear.ymax = 600;
    
    
    bear.isJumping = false;

    
    
    // Playerキャラにイベントリスナを追加
    // enterframeイベント（1フレームごとに発生するイベント）の処理内容を定義する
    bear.addEventListener('enterframe', function(e) {

      // Characterをアニメーションさせる
      // frame 0,1,2を交互に表示させる
      this.frame = core.frame / 2 % 3 + 10 ;


      // 横方向への自動移動を行う
      // X座標の端に来たら、移動量を反転させる
      if ( this.x > this.xmax ) {
        this.xv = - this.xv;
        this.scaleX = -1;
      }
      if ( this.x < this.xmin ) {
        this.xv = - this.xv;
        this.scaleX = 1;
      }
      this.x = this.x + this.xv;
      

      // ジャンプ処理
      // Aボタンを押すことで、isJumpingフラグを立て、Y軸の移動量を変更する。
      if ( core.input.a == true && this.isJumping != true){
        this.isJumping = true;
        this.yv = -8;
      }
      
      // Y座標の移動を行った後、
      // ジャンプした高さが最大値に達したかどうかをチェックし、
      // 達していればY軸の移動量を反転させる。
      if ( this.isJumping == true ) {
        
        this.y = this.y + this.yv;
        this.yjumped = this.yjumped + this.yv;
        
        if ( this.yjumped <= this.yjumpmax ) this.yv = - this.yv;
        if ( this.y  > this.ymax ) this.isJumping = false;
        
      }
      
      
      
    
    });
    
    
    // ステージマップ内の定義
    
    
    stagemap.loadData(
    [
      [],
      [],
    
    ]
    );
    
    
  }
  core.start();


}
