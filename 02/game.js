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
    var bear = new Sprite(32, 32);
    bear.image = core.assets['chara1.png'];
    core.rootScene.addChild(bear);
    
    
    // Map�𐶐�
    // �}�b�v�`�b�v�T�C�Y��16x16
    var stagemap = new Map(core.width / 16, core.height / 16);
    stagemap.image = core.assets['map0.png'];
    
    
    console.log('A Map object has been created as ' + stagemap.width + ' x ' + stagemap.height + ' chips .');

    // Player�L�����̃v���p�e�B�l��ݒ�
    
    
    //
    // Character�̑�������ݒ�
    //   integer x: ��ʏ��X���W
    //   integer y: ��ʏ��Y���W
    //   integer xv: X�������ւ̈ړ���
    //   integer yv: Y�������ւ̈ړ���
    //   integer xmin: X���̍ŏ��l�i���[���E�̍��W�j
    //   integer xmax: X���̍ő�l�i�E�[���E�̍��W�j
    //   integer ymin: Y���̍ŏ��l
    //   integer ymax: X���̍ő�l

    //   boolean isJumping: �W�����v�����ǂ�����\���t���O
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

    
    
    // Player�L�����ɃC�x���g���X�i��ǉ�
    // enterframe�C�x���g�i1�t���[�����Ƃɔ�������C�x���g�j�̏������e���`����
    bear.addEventListener('enterframe', function(e) {

      // Character���A�j���[�V����������
      // frame 0,1,2�����݂ɕ\��������
      this.frame = core.frame / 2 % 3 + 10 ;


      // �������ւ̎����ړ����s��
      // X���W�̒[�ɗ�����A�ړ��ʂ𔽓]������
      if ( this.x > this.xmax ) {
        this.xv = - this.xv;
        this.scaleX = -1;
      }
      if ( this.x < this.xmin ) {
        this.xv = - this.xv;
        this.scaleX = 1;
      }
      this.x = this.x + this.xv;
      

      // �W�����v����
      // A�{�^�����������ƂŁAisJumping�t���O�𗧂āAY���̈ړ��ʂ�ύX����B
      if ( core.input.a == true && this.isJumping != true){
        this.isJumping = true;
        this.yv = -8;
      }
      
      // Y���W�̈ړ����s������A
      // �W�����v�����������ő�l�ɒB�������ǂ������`�F�b�N���A
      // �B���Ă����Y���̈ړ��ʂ𔽓]������B
      if ( this.isJumping == true ) {
        
        this.y = this.y + this.yv;
        this.yjumped = this.yjumped + this.yv;
        
        if ( this.yjumped <= this.yjumpmax ) this.yv = - this.yv;
        if ( this.y  > this.ymax ) this.isJumping = false;
        
      }
      
      
      
    
    });
    
    
    // �X�e�[�W�}�b�v���̒�`
    
    
    stagemap.loadData(
    [
      [],
      [],
    
    ]
    );
    
    
  }
  core.start();


}
