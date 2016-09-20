enchant();

window.onload = function() {
  var core = new Core(320, 320);

  core.fps = 24;
  core.preload('chara1.png');
  core.preload('map2.png');
  
  // �y�[�W�̃��[�h��������A���s�����B
  core.onload = function() {
    
    console.log('A Core object has been created as ' + core.width + ' x ' + core.height + ' .');
    
    // �X�y�[�X�L�[��A�{�^���Ƀo�C���h
    core.keybind(0x20, 'a');
    
    
    
    // Map�𐶐�
    // �}�b�v�`�b�v�T�C�Y��16x16�ŌŒ�
    var stagemap = new Map(16, 16);
    stagemap.image = core.assets['map2.png'];
    core.rootScene.addChild(stagemap);
    
    // �S�̂�Pixel���`�b�v�T�C�Y�ŏ��Z���A�}�b�v�̑傫�����v�Z����B
    stagemap.chipsWidth = core.width / stagemap.tileWidth;
    stagemap.chipsHeight = core.height / stagemap.tileHeight;
    console.log('A Map object has been created as ' + stagemap.chipsWidth + ' x ' + stagemap.chipsHeight + ' chips .');

    // Player�L�����𐶐�
    var player = new Sprite(32, 32);
    player.image = core.assets['chara1.png'];
    core.rootScene.addChild(player);
    
    
    
    
    // �X�e�[�W�}�b�v�̃t�B�[���h�l���`
    //    integer defaultChipId: �w�i�p�`�b�v���w��
    //   integer groundChipId:  �n�ʕ`��p�̃`�b�v���w��
    //   integer blockChipId:   �󒆂̃u���b�N�`��p�̃`�b�v���w��
    stagemap.defaultChipId = 18;
    stagemap.groundChipId  = 0;
    stagemap.blockChipId   = 3;
    
    // �}�b�v�������_���Ő�������B
    // �������A������groundLevel�s�����͒n�ʂ�`�悷��B
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
    // Player�L�����N�^�[�̐���
    // --------------------------------------------------------------------------------

    // �S�̂�Pixel���`�b�v�T�C�Y�ŏ��Z���A�}�b�v�̑傫�����v�Z����B
    console.log('A Map object has been created as ' + stagemap.tileWidth + ' x ' + stagemap.tileHeight + ' chips .');

    // Player�L�����̃t�B�[���h�l��ݒ�
    //   integer x: ��ʏ��X���W
    //   integer y: ��ʏ��Y���W
    //   integer xv: X�������ւ̈ړ���
    //   integer yv: Y�������ւ̈ړ���
    //   integer yjumpmax: �W�����v��
    //   integer yjumped: ���݂̃W�����v��
    //   integer xmin: X���̍ŏ��l�i���[���E�̍��W�j
    //   integer xmax: X���̍ő�l�i�E�[���E�̍��W�j
    //   integer ymin: Y���̍ŏ��l
    //   integer ymax: Y���̍ő�l
    //   boolean isJumping: �W�����v�����ǂ�����\���t���O
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
    // Player�L�����ɃC�x���g���X�i��ǉ�
    // enterframe�C�x���g�i1�t���[�����Ƃɔ�������C�x���g�j�̏������e���`����
    // ---------------------------------------- //
    player.addEventListener('enterframe', function(e) {

      // Character���A�j���[�V����������
      // frame 0,1,2�����݂ɕ\��������
      this.frame = core.frame / 2 % 3 + 10 ;

      // ---------------------------------------- //
      // �������ւ̎����ړ����s��
      // X���W�̒[�ɗ�����A�ړ��ʂ𔽓]������
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
      // �W�����v����
      // ---------------------------------------- //
        this.y = this.y + this.yv;

        // ���~���邩�ǂ������肷��
        if ((stagemap.hitTest((this.x + this.width / 2), (this.y + this.height)) == false) && (this.isJumping == false) ) {
          console.log ("now it is moving down.");
          this.yv = 8;
          this.isJumping = true;
        }

        // �W�����v���ł���ꍇ�A
        // �W�����v�����������ő�l�ɒB�������ǂ������`�F�b�N���A
        // �B���Ă����Y���̈ړ��ʂ𔽓]������B
        if (this.isJumping == true) {
          if (this.yv >= 0) {
             // Player�L���������~���̏����i��vy�����̒l�̏ꍇ�j
             if ((stagemap.hitTest((this.x + this.width / 2), (this.y + this.height)) == true) && (stagemap.hitTest((this.x + this.width / 2), (this.y + this.height - 1)) == false)) {
               console.log ("now it has been touched down..");
               this.isJumping = false;
               this.yv = 0;
               this.yjumped = 0;
             }
          
          } else {
            // �W�����v����������ݎZ���A�ő�l�𒴂��Ă���Έړ��ʂ𔽓]
            this.yjumped = this.yjumped + this.yv;
            if (this.yjumped <= this.yjumpmax) {
              console.log ("now it has achieved the top of jumping height.");
              this.yv = - this.yv;
            }
          }
        }
        


        // A�{�^�����������ƂŁAisJumping�t���O�𗧂āAY���̈ړ��ʂ�ύX����B
        if (core.input.a == true && this.isJumping != true) {
          console.log ("now it has started jumping.");
          this.isJumping = true;
          this.yv = -8;
        }
      
      
      
    
    });

    
  }
  core.start();


}
