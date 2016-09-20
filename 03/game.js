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
    var player = new Sprite(32, 32);
    player.image = core.assets['chara1.png'];
    core.rootScene.addChild(player);
    
    
    // Mapを生成
    // マップチップサイズは16x16
    var stagemap = new Map( (core.width / 16), (core.height / 16) );
    stagemap.image = core.assets['map0.png'];
    
    // Chromeでは Map.tileWidthを取得できない模様。0が返る。
    // Firefoxでは取得できる。
    console.log('A Map object has been created as ' + stagemap.tileWidth + ' x ' + stagemap.tileHeight + ' chips .');

    // Playerキャラのフィールド値を設定
    //   integer x: 画面上のX座標
    //   integer y: 画面上のY座標
    //   integer xv: X軸方向への移動量
    //   integer yv: Y軸方向への移動量
    //   integer yjumpmax: ジャンプ力
    //   integer yjumped: 現在のジャンプ量
    //   integer xmin: X軸の最小値（左端限界の座標）
    //   integer xmax: X軸の最大値（右端限界の座標）
    //   integer ymin: Y軸の最小値
    //   integer ymax: X軸の最大値
    //   boolean isJumping: ジャンプ中かどうかを表すフラグ
    //   
    
    
    player.frame = 0;
    player.x = 0;
    player.y = 608;
    player.xv = 4;
    player.yv = 0;
    player.yjumpmax = -80;
    player.yjumped = 0;
    player.xmin = 0;
    player.xmax = 280;
    player.ymin = 20;
    player.ymax = 600;
    player.isJumping = false;

    // Playerキャラにイベントリスナを追加
    // enterframeイベント（1フレームごとに発生するイベント）の処理内容を定義する
    player.addEventListener('enterframe', function(e) {

      // Characterをアニメーションさせる
      // frame 0,1,2を交互に表示させる
      this.frame = core.frame / 2 % 3 + 10 ;


      // 横方向への自動移動を行う
      // X座標の端に来たら、移動量を反転させる
      if (this.x > this.xmax) {
        this.xv = - this.xv;
        this.scaleX = -1;
      }
      if (this.x < this.xmin) {
        this.xv = - this.xv;
        this.scaleX = 1;
      }
      this.x = this.x + this.xv;
      

      // ジャンプ処理
      // Aボタンを押すことで、isJumpingフラグを立て、Y軸の移動量を変更する。
      if (core.input.a == true && this.isJumping != true){
        this.isJumping = true;
        this.yv = -8;
      }
      
      // Y座標の移動を行った後、
      // ジャンプした高さが最大値に達したかどうかをチェックし、
      // 達していればY軸の移動量を反転させる。
      if (this.isJumping == true) {
        
        this.y = this.y + this.yv;
        this.yjumped = this.yjumped + this.yv;
        
        if (this.yjumped <= this.yjumpmax) this.yv = - this.yv;
        if (this.y  > this.ymax) this.isJumping = false;
        
      }
      
      
      
    
    });
    
    
    // ステージマップのフィールド値を定義
    //    integer defaultChipId: 背景用チップを指定
    //   integer groundChipId:  地面描画用のチップを指定
    //   integer blockChipId:   空中のブロック描画用のチップを指定
    stagemap.defaultChipId = 1;
    stagemap.groundChipId = 0;
    stagemap.blockChipId  = 3;
    
    // マップをランダムで生成する。
    // ただし、下から2行分は地面を描画する。
    var mapChipArray = [];
    var mapCollArray = [];
    var blockMinLength = 3;
    var blockMaxLength = 10;
    var groundLevel = 2;

    for ( var y = 0 ; y < (stagemap.tileHeight - groundLevel) ; y++ ) {
      for ( var x = 0 ; x < stagemap.tileWidth ; x++ ) {
        console.log('Now creating a chip on a Map object at ' + y + ' x ' + x + ' point.');
        mapChipArray[y][x] = stagemap.defaultChipId;
        mapCollArray[y][x] = 0;
      }
    
    
    }
    
    for ( var y = (stagemap.tileHeight - groundLevel) ; y < stagemap.tileHeight ; y++ ) {
    
      for (var x = 0 ; x < stagemap.tileWidth ; x++ ) {
        mapArray[0][y][x] = stagemap.groundChipId;
        mapCollArray[y][x] = 1;
      }
    
    }
    stagemap.loadData(mapChipArray);
    stagemap.mapCollArray;
    
  }
  core.start();


}
