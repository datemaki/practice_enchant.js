enchant();

window.onload = function() {
  var core = new Core(320, 320);

  core.fps = 24;
  core.preload('chara1.png');
  core.preload('map2.png');
  
  // ページのロードが完了後、実行される。
  core.onload = function() {
    
    console.log('A Core object has been created as ' + core.width + ' x ' + core.height + ' .');
    
    // スペースキーをAボタンにバインド
    core.keybind(0x20, 'a');
    
    
    
    // Mapを生成
    // マップチップサイズは16x16で固定
    var stagemap = new Map(16, 16);
    stagemap.image = core.assets['map2.png'];
    core.rootScene.addChild(stagemap);
    
    // 全体のPixelをチップサイズで除算し、マップの大きさを計算する。
    stagemap.chipsWidth = core.width / stagemap.tileWidth;
    stagemap.chipsHeight = core.height / stagemap.tileHeight;
    console.log('A Map object has been created as ' + stagemap.chipsWidth + ' x ' + stagemap.chipsHeight + ' chips .');

    // Playerキャラを生成
    var player = new Sprite(32, 32);
    player.image = core.assets['chara1.png'];
    core.rootScene.addChild(player);
    
    
    
    
    // ステージマップのフィールド値を定義
    //    integer defaultChipId: 背景用チップを指定
    //   integer groundChipId:  地面描画用のチップを指定
    //   integer blockChipId:   空中のブロック描画用のチップを指定
    stagemap.defaultChipId = 18;
    stagemap.groundChipId  = 0;
    stagemap.blockChipId   = 3;
    
    // マップをランダムで生成する。
    // ただし、下からgroundLevel行数分は地面を描画する。
    var mapChipArray = [];
    var mapCollArray = [];
    var blockMinLength = 3;
    var blockMaxLength = 10;
    var groundLevel = 2;

    mapChipArray[0] = [18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18];
    mapChipArray[1] = [18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18];
    mapChipArray[2] = [18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18];
    mapChipArray[3] = [18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18];
    mapChipArray[4] = [18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18];
    mapChipArray[5] = [18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18];
    mapChipArray[6] = [18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18];
    mapChipArray[7] = [18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18];
    mapChipArray[8] = [18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18];
    mapChipArray[9] = [18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18];
    mapChipArray[10] = [18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18];
    mapChipArray[11] = [18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18];
    mapChipArray[12] = [18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18];
    mapChipArray[13] = [18,18,18,18,18,3,3,3,3,18,18,18,18,18,18,18,18,18,18,18];
    mapChipArray[14] = [18,18,18,18,18,18,18,18,18,18,18,18,3,3,18,18,18,18,18,18];
    mapChipArray[15] = [18,18,3,3,3,18,18,18,3,3,18,18,18,18,18,18,18,18,18,18];
    mapChipArray[16] = [18,18,18,18,18,18,18,18,18,18,18,18,18,18,3,3,3,18,18,18];
    mapChipArray[17] = [18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18];
    mapChipArray[18] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    mapChipArray[19] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

    mapCollArray[0] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    mapCollArray[1] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    mapCollArray[2] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    mapCollArray[3] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    mapCollArray[4] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    mapCollArray[5] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    mapCollArray[6] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    mapCollArray[7] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    mapCollArray[8] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    mapCollArray[9] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    mapCollArray[10] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    mapCollArray[11] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    mapCollArray[12] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    mapCollArray[13] = [0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0];
    mapCollArray[14] = [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0];
    mapCollArray[15] = [0,0,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0];
    mapCollArray[16] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0];
    mapCollArray[17] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    mapCollArray[18] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    mapCollArray[19] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    
    stagemap.loadData(mapChipArray);
    stagemap.collisionData = mapCollArray;


    // --------------------------------------------------------------------------------
    // Playerキャラクターの生成
    // --------------------------------------------------------------------------------

    // 全体のPixelをチップサイズで除算し、マップの大きさを計算する。
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
    //   integer ymax: Y軸の最大値
    //   boolean isJumping: ジャンプ中かどうかを表すフラグ
    //   
    
    
    player.frame = 0;
    player.x = 0;
    player.y = core.height - (16 * groundLevel) - 32;
    player.xv = 4;
    player.yv = 0;
    player.yjumpmax = -80;
    player.yjumped = 0;
    player.xmin = 0;
    player.xmax = core.width - player.width;
    player.ymin = 20;
    player.ymax = core.height - (16 * groundLevel) - 32;
    player.isJumping = false;

    // ---------------------------------------- //
    // Playerキャラにイベントリスナを追加
    // enterframeイベント（1フレームごとに発生するイベント）の処理内容を定義する
    // ---------------------------------------- //
    player.addEventListener('enterframe', function(e) {

      // Characterをアニメーションさせる
      // frame 0,1,2を交互に表示させる
      this.frame = core.frame / 2 % 3 + 10 ;

      // ---------------------------------------- //
      // 横方向への自動移動を行う
      // X座標の端に来たら、移動量を反転させる
      // ---------------------------------------- //
      if (this.x > this.xmax) {
        this.xv = - this.xv;
        this.scaleX = -1;
      }
      if (this.x < this.xmin) {
        this.xv = - this.xv;
        this.scaleX = 1;
      }
      this.x = this.x + this.xv;

      
      // ---------------------------------------- //
      // ジャンプ処理
      // ---------------------------------------- //
        this.y = this.y + this.yv;

        // 下降するかどうか判定する
        if ((stagemap.hitTest((this.x + this.width / 2), (this.y + this.height)) == false) && (this.isJumping == false) ) {
          console.log ("now it is moving down.");
          this.yv = 8;
          this.isJumping = true;
        }

        // ジャンプ中である場合、
        // ジャンプした高さが最大値に達したかどうかをチェックし、
        // 達していればY軸の移動量を反転させる。
        if (this.isJumping == true) {
          if (this.yv >= 0) {
             // Playerキャラが下降中の処理（＝vyが正の値の場合）
             if ((stagemap.hitTest((this.x + this.width / 2), (this.y + this.height)) == true) && (stagemap.hitTest((this.x + this.width / 2), (this.y + this.height - 1)) == false)) {
               console.log ("now it has been touched down..");
               this.isJumping = false;
               this.yv = 0;
               this.yjumped = 0;
             }
          
          } else {
            // ジャンプした高さを累算し、最大値を超えていれば移動量を反転
            this.yjumped = this.yjumped + this.yv;
            if (this.yjumped <= this.yjumpmax) {
              console.log ("now it has achieved the top of jumping height.");
              this.yv = - this.yv;
            }
          }
        }
        


        // Aボタンを押すことで、isJumpingフラグを立て、Y軸の移動量を変更する。
        if (core.input.a == true && this.isJumping != true) {
          console.log ("now it has started jumping.");
          this.isJumping = true;
          this.yv = -8;
        }
      
      
      
    
    });

    
  }
  core.start();


}
