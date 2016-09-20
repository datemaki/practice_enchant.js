enchant();

window.onload = function() {
  var core = new Core(320, 640);

  core.fps = 24;
  core.preload('chara1.png');
  core.preload('map0.png');
  
  // �y�[�W�̃��[�h��������A���s�����B
  core.onload = function() {
    
    console.log('A Core object has been created as ' + core.width + ' x ' + core.height + ' .');
    
    // �X�y�[�X�L�[��A�{�^���Ƀo�C���h
    core.keybind(0x20, 'a');
    
    
    
    
    
    // Player�L�����𐶐�
    var player = new Sprite(32, 32);
    player.image = core.assets['chara1.png'];
    core.rootScene.addChild(player);
    
    
    // Map�𐶐�
    // �}�b�v�`�b�v�T�C�Y��16x16
    var stagemap = new Map( (core.width / 16), (core.height / 16) );
    stagemap.image = core.assets['map0.png'];
    
    // Chrome�ł� Map.tileWidth���擾�ł��Ȃ��͗l�B0���Ԃ�B
    // Firefox�ł͎擾�ł���B
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
    //   integer ymax: X���̍ő�l
    //   boolean isJumping: �W�����v�����ǂ�����\���t���O
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

    // Player�L�����ɃC�x���g���X�i��ǉ�
    // enterframe�C�x���g�i1�t���[�����Ƃɔ�������C�x���g�j�̏������e���`����
    player.addEventListener('enterframe', function(e) {

      // Character���A�j���[�V����������
      // frame 0,1,2�����݂ɕ\��������
      this.frame = core.frame / 2 % 3 + 10 ;


      // �������ւ̎����ړ����s��
      // X���W�̒[�ɗ�����A�ړ��ʂ𔽓]������
      if (this.x > this.xmax) {
        this.xv = - this.xv;
        this.scaleX = -1;
      }
      if (this.x < this.xmin) {
        this.xv = - this.xv;
        this.scaleX = 1;
      }
      this.x = this.x + this.xv;
      

      // �W�����v����
      // A�{�^�����������ƂŁAisJumping�t���O�𗧂āAY���̈ړ��ʂ�ύX����B
      if (core.input.a == true && this.isJumping != true){
        this.isJumping = true;
        this.yv = -8;
      }
      
      // Y���W�̈ړ����s������A
      // �W�����v�����������ő�l�ɒB�������ǂ������`�F�b�N���A
      // �B���Ă����Y���̈ړ��ʂ𔽓]������B
      if (this.isJumping == true) {
        
        this.y = this.y + this.yv;
        this.yjumped = this.yjumped + this.yv;
        
        if (this.yjumped <= this.yjumpmax) this.yv = - this.yv;
        if (this.y  > this.ymax) this.isJumping = false;
        
      }
      
      
      
    
    });
    
    
    // �X�e�[�W�}�b�v�̃t�B�[���h�l���`
    //    integer defaultChipId: �w�i�p�`�b�v���w��
    //   integer groundChipId:  �n�ʕ`��p�̃`�b�v���w��
    //   integer blockChipId:   �󒆂̃u���b�N�`��p�̃`�b�v���w��
    stagemap.defaultChipId = 1;
    stagemap.groundChipId = 0;
    stagemap.blockChipId  = 3;
    
    // �}�b�v�������_���Ő�������B
    // �������A������2�s���͒n�ʂ�`�悷��B
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
