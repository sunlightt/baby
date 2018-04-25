
const app=getApp();

const WxParse = require('../../wxParse/wxParse.js');


var code1 = '<p><span style="font-size: 20px; color: rgb(247, 117, 103); font-weight: bold;">宝宝的生长发育评估： </span></p><p><span style="font-size: 16px; color: rgb(247, 117, 103); font-weight: bold;">宝宝的生长曲线：体重（数据来源于WHO世界卫生组织）</span></p><p>多次记录X的体重数据可以获得更加完整的生长曲线哦~</p><p><span style="font-weight: bold;">体重：<font color="#df402a"><span style="caret-color: rgb(223, 64, 42);">宝宝</span></font></span>目前体重<font color="#e66c00"><span style="caret-color: rgb(230, 108, 0);"><b>3.2</b></span></font>kg<span style="font-weight: bold;">，</span><span style="text-decoration: none;">生长发育得很好！ 正在按照最标准的曲线健康成长呢~</span></p><p>大部分婴儿出生5天内体重会减少10%，这是生理性体重下降，不要惊慌。5天后会慢慢恢复，差不多第10天会恢复到出生时的体重，之后会以每天20—50克增长。</p><p><span style="font-size: 16px; color: rgb(247, 117, 103); font-weight: bold;">宝宝的生长曲线：身高（数据来源于WHO世界卫生组织）</span></p><p>多次记录X的身高数据可以获得更加完整的生长曲线哦~</p><p><span style="font-weight: bold;">身高：<font color="#df402a"><span style="caret-color: rgb(223, 64, 42);">宝宝</span></font></span>目前身高<font color="#e66c00"><span style="caret-color: rgb(230, 108, 0);"><b>49.3</b></span></font>cm<span style="font-weight: bold;">，</span><span style="text-decoration: none;">生长发育得很好！ 正在按照最标准的曲线健康成长呢~；</span></p><p><span style="color: rgb(77, 128, 191);">推荐课程：《1月龄疫苗提醒及注意事项》</span></p><p><br/></p>';

var code2 = '<p><span style="font-size: 20px; color: rgb(247, 117, 103); font-weight: bold;">宝宝的喂养睡眠方案：</span></p><p><span style="font-size: 16px; color: rgb(247, 117, 103); font-weight: bold;">1.每日喂养、睡眠状况</span></p><p>1、<span style="color:#df402a"><span style="caret-color: rgb(223, 64, 42);"><strong>宝宝</strong></span></span>目前喂养方式为<span style="color: rgb(247, 117, 103);">母乳</span>喂养，</p><p><span style="text-decoration: none;">每日哺喂次数为<span style="color:#f77567"><span style="text-decoration: none; caret-color: rgb(247, 117, 103);"><strong>8</strong></span></span>次，平均每次哺喂时长为<span style="color:#f77567"><span style="text-decoration: none; caret-color: rgb(247, 117, 103);"><strong>5</strong></span></span>分钟。宝宝每日摄入的奶量正常，发育情况良好~</span></p><p>2、<span style="color: rgb(247, 117, 103); font-weight: bold;">宝宝</span>目前每日睡眠总时长为C小时，<span style="text-decoration: none;">睡眠正常，请继续保持良好的睡眠习惯哦~；宝宝夜醒次数正常，宝妈请坚持下去，很快就会迎来曙光~</span></p><p><span style="font-size: 16px; color: rgb(247, 117, 103); font-weight: bold;">2.喂养注意事项</span></p><p><span style="font-weight: bold;">1、母乳喂养</span>：母乳是宝宝最好的粮食，对宝宝和妈妈都有很多益处，是再好的配方奶都无法代替的，所以我们鼓励6个月前尽量母乳喂养，早开奶，让宝宝尽早吸吮是促进乳汁分泌最好的方法，每日哺乳至少8次，按需喂养；</p><p><span style="color: rgb(77, 128, 191);">推荐课程：《母乳喂养的重要性》、《正确的衔乳姿势 》、《哺乳常用姿势 》、《1月龄》</span></p><p><span style="font-weight: bold;">2、配方奶喂养</span>：如果妈妈患有不能哺乳的疾病或长期需服用不能哺乳的药物，或者宝宝患有半乳糖血症，就需要用配方奶喂养了。出生几天后，平均每次奶量达到60-90ml，一周后大部分婴儿每顿可以喝90-120ml，尽量按需喂养，新生儿出生1-2周内，有的一天可达十几次的吸吮频率。</p><p><span style="color: rgb(77, 128, 191);">推荐课程：《什么才是奶量不足？》、《哺乳妈妈乳头皲裂怎么办》、《宝宝需要额外喂水吗？》</span></p><p><span style="font-weight: bold;">3、混合喂养（母乳＋配方奶）：</span>妈妈母乳不够供给宝宝一天的奶量，就需要用配方奶补充母乳的不足了，建议每次喂奶都先让宝宝至少吸吮母乳10~15分钟母乳，不足的用配方奶补充，保证每天对乳房足够的刺激，促进泌乳素分泌，向纯母乳喂养努力！</p><p><span style="color: rgb(77, 128, 191);">推荐课程：《宝宝分不清奶嘴和乳头应该怎么办》、《晚上睡觉要叫醒宝宝喝奶吗？》、《防范乳腺炎》</span></p><p><span style="font-weight: bold;">如何判断宝宝是否吃饱？</span></p><p>1、每天至少尿湿4-6次纸尿裤。</p><p>2、每天排出3-4次松软的、夹杂着一些细小颗粒的粪便。</p><p>3、宝宝平均每吸吮2~3次，可以听到咽下一大口的声音，喝奶后不再哭闹。</p><p>4、喂奶前妈妈感到乳房胀，喂奶后觉得没那么胀。</p><p>5、宝宝的体重增加也是衡量奶水是否充足的指标。除了第一周宝宝的体重会有所减轻，头几周，如果奶水充足，宝宝体重平均每周要增加115-200克，头6个月，平均每月增加450-900克，从6个月到1年，平均每月增加500克。</p><p><span style="font-size: 16px; color: rgb(247, 117, 103); font-weight: bold;">3.睡眠调整方案</span></p><p>这个月龄的宝宝如果晚上睡觉时间不固定，将不利于今后良好睡眠规律的形成。所以建议晚上最好是在8点左右入睡，到了固定可以入睡的点，就把宝宝带到卧室哄睡，而不是今天8点，明天10点。</p><p>入睡方式尽量采用自主入睡，建议做法：睡前给宝宝洗个温水澡-做抚触-建议裹襁褓减少惊跳反应，给予宝宝安全感（若宝宝惊跳反应不严重可以不裹）-语言告诉宝宝要睡觉了，不管宝宝是否能听懂-慢慢将房间里的灯变暗或直接关掉-放一首舒缓的催眠曲（每天固定一首）/讲故事-竖抱宝宝斜靠着静坐5分钟后将宝宝轻轻放下-轻轻嘘拍宝宝直到安静的自主入睡。</p><p><span style="color: rgb(77, 128, 191);">推荐课程：《1月龄宝宝睡眠概述》、《宝宝每天需要睡多久》、《宝宝不分黑白天怎么办》、《宝宝夜里睡觉不踏实怎么办》</span></p><p><br/></p>';

var code3 = '<p><span style="font-size: 20px; color: rgb(247, 117, 103); font-weight: bold;">宝宝的个性养育推荐： </span></p><p><span style="font-size: 16px; color: rgb(247, 117, 103); font-weight: bold;">1.每日运动方式/运动量推荐</span></p><p><span style="font-weight: bold;">抚触：</span>每天洗澡后进行有技巧的抚触，通过抚触者双手对宝宝的皮肤各部位进行有次序的、有手法技巧抚摸。拥有促进宝宝生长发育、刺激宝宝的淋巴系统、增加抵抗能力、促进食物消化吸收、促进亲子情感交流等等好处。</p><p><span style="font-weight: bold;">趴玩：</span>在宝宝心情愉悦的时候可以多让他趴着，练习抬头对宝宝有着很多的好处：促进颈背部肌肉发育、有助于塑造完美头型、有助于大运动发展。不用担心宝宝累，累了他会自己把头靠到床上或者哭闹，这时我们需要及时帮宝宝恢复仰卧体位。注意宝宝练习趴的时候，一定要有监护人看守。</p><p><span style="font-weight: bold;">飞机抱：</span>这个月龄的宝宝很容易肠胀气，多采用飞机抱的抱姿不仅可以增加宝宝腹压，预防和缓解胀气情况，还能帮助宝宝练习抬头哦！</p><p><span style="font-weight: bold;"> &nbsp;平衡训练：</span>把宝宝放在一个小垫子上，爸爸妈妈分别拉住小垫子的四脚，做前后、左右、上下的移动，但注意要注意安全哦！</p><p><span style="color: rgb(77, 128, 191);">推荐课程：《1月龄大运动训练》、《1月龄精细动作训练》</span></p><p><span style="font-size: 16px; color: rgb(247, 117, 103); font-weight: bold;">2.玩具推荐</span></p><p><span style="font-weight: bold;">1、床铃：</span>轻柔的音乐配上缓缓旋转的卡通配饰，综合刺激宝宝的视觉和听觉发育（记住一定要每天变换不同的悬挂位置，防止宝宝斜视哦）。</p><p><span style="font-weight: bold;">2、黑白卡片：</span>宝宝这时候最敏感的就是黑白两色的对比了，选一些图案简单、对比强烈的黑白卡片，可以刺激宝宝视觉发育。</p><p><span style="font-weight: bold;">3、费雪海马：</span>舒缓的摇篮曲和柔和的海浪声可以给予宝宝安全感，起到安抚的作用。</p><p><span style="font-weight: bold;">4、早教机（如火火兔）：</span>里面有不同类型的音乐，可以给宝宝解闷，其中舒缓的音乐或者故事还可以作为哄睡的工具。</p><p><span style="font-weight: bold;">5、摇铃：</span>宝宝还不会抓握，家长可以通过摇铃发出响声吸引宝宝注意，练习对于声音方位的判断能力。</p><p><span style="color: rgb(77, 128, 191);">推荐课程：《1月龄玩具推荐》</span></p><p><span style="font-size: 16px; color: rgb(247, 117, 103); font-weight: bold;">3.家庭早期教育</span></p><p><span style="font-weight: bold;">1、多和宝宝交流：</span>不需要借助任何道具，和宝宝轻柔的、或者语调抑扬顿挫表情丰富的对话即可，可以同时和洗澡、抚触、更换尿不湿等等活动时进行。培养宝宝听人说话的兴趣，锻炼听力。</p><p><span style="font-weight: bold;">2、感受声音：</span>利用沙锤、拨浪鼓、摇铃等等道具，在不同方位和不同远近发出响声。锻炼宝宝的听力，感受不同的音色和节奏。</p><p>推荐课程：</p><p><span style="color: rgb(77, 128, 191);">推荐课程：《黑白卡视觉激发》</span></p><p><span style="font-size: 16px; color: rgb(247, 117, 103); font-weight: bold;">4.亲子游戏推荐</span></p><p>【摇啊摇】爸爸妈妈坐在椅子上，将双脚踩在小板凳上，让宝宝的两只小脚朝向自己的腹部，平躺在大腿上。爸爸妈妈用双手托住宝宝的头部，然后一边轻轻地左右晃动身体，一边跟宝宝说话或者唱歌。</p><p>【绒球游戏】爸爸妈妈找一些色彩鲜艳的绒球或者毛绒玩具，将绒球或毛绒玩具放在距离宝宝面前30—38厘米（建议和前面的视觉范围20-25统一）的位置，将宝宝的注意力集中在玩具上。然后不同方向慢慢移动绒球或者毛绒玩具，根据宝宝视线追踪物体的能力限度来决定移动玩具的速度。试着慢慢将玩具升高或者下降，让宝宝观察这种远近变化。用玩具轻轻触碰宝宝的身体或摩擦他的小脸和手臂。但是请记住，绝不可以让宝宝和小物体单独在一起。</p><p>【与宝宝共舞】爸爸妈妈带着宝宝一起舞动是安抚宝宝的好方法。将宝宝稳稳地抱在怀中，随着不同风格的音乐轻柔地舞动，注意音乐音量不要太大。这种感觉和宝宝在子宫中的感觉很像，还可以增强宝宝的平衡能力。</p><p>【宝宝仰卧起坐】与娇小的身体比起来，新生儿的头部看起来很大。宝宝无法控制自己这么大、这么重的头部——他只能暂时将头部抬起一下，因为他的颈部肌肉还无力控制其头部。爸爸妈妈可以试着帮助宝宝坐立，从而增强其肌肉的力量。让宝宝仰卧在坛子上，用毯子作为婴儿背带。两手抓住靠近宝宝头顶的毯子边缘，轻轻将宝宝抬起，然后放下，如此重复几次。</p><p>【这是谁】新生儿对人脸的兴趣远超过其他物体——比如摇铃、几何图形，甚至是绘制的人物面孔。刚出生几周的小婴儿就会盯着其他人的脸看，但他并不会知道这些人跟他有什么共同点。这意味着看到自己在镜子里的影像，宝宝会感到非常惊奇——他完全不知道那是谁。爸爸妈妈将镜子举高，让宝宝可以看清自己的模样。用手指着镜子里的宝宝，然后叫他的名字。当宝宝大一点后，他在镜子里的影像会促使他做出第一个社会性举动——一个小婴儿露出顽皮的笑容。</p><p><span style="color: rgb(77, 128, 191);">推荐课程：《1月龄亲子游戏》</span></p><p><span style="font-size: 16px; color: rgb(247, 117, 103); font-weight: bold;">5.爸爸如何参与育儿</span></p><p><span style="text-decoration: none;">宝宝的爸爸很棒呢！多多地陪伴宝宝、和宝宝玩耍，可以让宝宝更加全面健康地成长、提高爸爸和宝宝的亲密度，甚至对家庭氛围也有很积极的影响。请爸爸再接再厉~，下面的方法可以让爸爸的参与更加科学并多样化：</span></p><p><span style="font-weight: bold;">1、飞机抱：</span>爸爸比妈妈更有力气，飞机抱由爸爸来执行会给宝宝更多的安全感。</p><p><span style="font-weight: bold;">2、夜间喂奶：</span>宝宝晚上起来吃奶可以由爸爸将宝宝从婴儿床上抱给妈妈，喝完奶后由爸爸拍嗝哄睡。</p><p><span style="font-weight: bold;">3、日常护理：</span>只要爸爸有时间，应该积极参与到宝宝的护理中，比如洗澡、更换尿不湿、抚触等等都应该由爸爸分担一些。</p><p><span style="font-weight: bold;">4、多一些亲子时间：</span>爸爸下班回来就不要再看电子设备了，留给宝宝专属的亲子时间，这时候妈妈可以收拾家务，留给爸爸宝宝一个二人世界。</p><p><span style="font-weight: bold;">5、多和宝宝聊天：</span>有研究发现，因为女性音调比较高，听上去比较尖锐，而男性的嗓音听起来低沉、有磁性，更能让胎儿和初生的宝宝们接受，所以爸爸多和宝宝聊聊天吧！</p><p><span style="font-weight: bold;">6、多一些关于爸爸的认知：</span>如果爸爸工作确实很忙，没有时间陪伴宝宝，那么我们平时在和宝宝聊天的时候，可以多说一些关于爸爸的事情，还可以通过电话来和爸爸交流，强化宝宝对于爸爸的认知。</p><p><span style="font-size: 16px; color: rgb(247, 117, 103); font-weight: bold;">6.其他的一些建议</span></p><p>1、头几天，如果妈妈乳汁还没有这么快跟上来，需要用配方奶补充喂养，建议使用小勺或者滴管，而不是直接使用奶瓶，也不要过早给宝宝使用安抚奶嘴（满月前），以防发生乳头混淆，导致宝宝不吃妈妈的母乳了~</p><p>2、新生儿的指甲是长得非常快的，爸爸妈妈要勤给宝宝修剪指甲哦！不建议使用手套，以免影响宝宝手指精细运动的发展。</p><p>3、不建议长时间竖抱新生儿，除了吃完奶后的拍嗝，平时建议以摇篮式抱姿为主~</p><p>4、为了减轻宝宝的惊跳反应，提高睡眠质量，可以在宝宝睡觉时给他裹襁褓，但这不是传统的“蜡烛包”，不要将宝宝的脚用绳子紧紧捆绑，以免引起髋关节脱位~</p><p>5、不要以宝宝的手脚来判断他的冷热，而已摸颈背部，颈背部温暖就行了</p><p><br/></p>';

var code4 = '<p><span style="font-size: 20px; color: rgb(247, 117, 103); font-weight: bold;">宝宝的能力发展概况：</span></p><p><span style="font-weight: bold;">行为能力：</span>说不定你宝宝出生几天后就可以短暂的抬头，每次洗完澡做抚触时，或者宝宝白天清醒的时候多让他俯卧练习抬头，可以增强宝宝颈椎和肩颈部肌肉的力量。所以每天把宝宝抱在怀里，还不如让他多趴趴呢！但要注意，宝宝如果累了哭闹或者刚吃完奶就不要进行了哦！</p><p><span style="font-weight: bold;">反射行为：</span>①觅食反应：当宝宝面颊触到母亲乳房或其他部位时，会出现寻觅乳头的动作；②闭眼反应：被强光照射时，会紧紧闭上眼睛；③吸吮反射：当用乳头或手指碰新生儿的口唇时，会相应出现口唇及舌的吸吮蠕动；④拥抱反射：当母亲或家人突然走到孩子身旁或发出响声,会发现孩子出现两臂外展伸直,继而屈曲内收到胸前,呈拥抱状；⑤、握持反射：将手指触及宝宝手心时,宝宝会马上握紧不放。</p><p><span style="font-weight: bold;">嗅觉：</span>出生第6天后就能辨别妈妈的味道了，对一些特殊味道还能做出皱眉反应。</p><p><span style="font-weight: bold;">视力：</span>①可视范围只有20—25cm；②眼神习惯性游离，由于眼球调节能力不足加上鼻骨没有隆起，所以你总会觉得宝宝有些对眼，但这种现象只是暂时的哦，3个月内会慢慢好转，如果超过3个月你还觉得宝宝有对眼，建议带给医生看看呢~；③只能识别的颜色是黑、白、红；④最喜欢看的是人脸，特别是妈妈的。</p><p><span style="font-weight: bold;">听力：</span>听力：宝宝出生后都会做听力筛查，医学证明，宝宝在妈妈肚子里就已经具有了听的能力，而新生儿除了具有听力，还有声音的定向能力。宝宝最喜欢妈妈的声音，其次是爸爸的，因为宝宝对高亢悦耳的声音更为敏感，听到熟悉的声音还会扭头去看。</p><p><span style="font-weight: bold;">微笑：</span>当宝宝吃饱满足后，或者是睡觉时他可能会对你微笑哦！宝宝最早的微笑会出现在3—6周，好好享受这美妙的感觉吧！</p><p><span style="font-weight: bold;">语言能力：</span>这个阶段的宝宝暂时只能用哭来和你交流，饿了、困了、不舒服了、无聊了……都会通过哭声传递给你，爸爸妈妈们一定不要觉得宝宝听不懂就没有语言交流，我们应该多和宝宝聊聊天，对于他们的哭闹积极给予回应，但回应并不仅仅只有拥抱，还包括爱抚、交流、唱歌等等。</p><p><span style="color: rgb(77, 128, 191);">推荐课程：《1月龄宝宝生长发育及能力发展总结》、《宝宝出现这几个动作也许是非条件反射》</span></p><p><br/></p>';

var code5 = '<p><span style="font-size: 20px; color: rgb(247, 117, 103); font-weight: bold;">宝宝的阶段培育目标： </span></p><p>除了持续以前的喂养方式和运动训练，爸爸妈妈们还可以尝试着让宝宝练习“抬头的训练”。</p><p>1、俯腹抬头：宝宝空腹时将宝宝放在母亲的胸腹前，使其自然地俯卧在母亲的胸腹上，把双手放在宝宝脊柱按摩，逗引宝宝抬头片刻，每日3-4次，可促进颈部肌肉的发育。</p><p>2、俯卧抬头：两次喂奶之间让宝宝俯卧，按摩宝宝背部，用花铃棒逗引他抬头，并左右侧转动，每日3-4次，每次进行1—2分钟，促进颈部肌肉发展。</p><p>3、竖抱抬头：喂奶后将宝宝竖抱，使宝宝头部靠在母亲的肩上，轻拍几下背部，使其打嗝防止吐奶。然后不要扶住头部，让头部自然竖立片刻，每日3至4次，以促进颈部肌肉张力的发展。</p><p><span style="color: rgb(77, 128, 191);">推荐课程：《1月龄大运动训练》、《1月龄精细动作训练》</span></p><p><br/></p>';

var code6 = '<p><span style="font-size: 20px; color: rgb(247, 117, 103); font-weight: bold;">宝宝可以尝试挑战的更高难度目标： </span></p><p>除了完成本阶段常规培育目标，爸爸妈妈们还可以尝试着让宝宝挑战更高难度的“体操运动”。</p><p>1、宝宝清醒状态时，给他做一做排气操，室内空气应该新鲜。</p><p>2、将宝宝置放在铺好垫子的硬板床上，双手轻轻握住宝宝的手或脚，和着音乐节拍做四肢运动，使宝宝感到舒适愉快。</p><p>3、如果宝宝烦躁紧张，可暂缓做操，改为全身皮肤轻轻地触摸，使宝宝适应后再做操。</p><p><br/></p>';

var code7 = '<p><span style="font-size: 20px; color: rgb(247, 117, 103); font-weight: bold;">宝爸宝妈可能面临的育儿问题： </span></p><p><span style="font-weight: bold;">1、肠绞痛：</span>如果你的宝宝是喂养充足的，但在出生后2—3周后，每天哭闹至少3小时，每次哭闹至少3天，发作超过3周，且一般发生在傍晚。那很有可能就是肠绞痛了。护理：①在精神状态良好的时候多做排气操、多顺时针按摩腹部（注意避开肚脐）；②如果是配方奶喂养且肠绞痛较严重，可考虑换成部分水解蛋白配方粉；③飞机抱或者俯卧，增加腹压；④母乳喂养的乳母避免食用容易胀气的食物如：土豆、红薯、豆制品、花椰菜、西蓝花等；⑤服用益生菌；⑥严重的服用西甲硅油。</p><p><span style="font-weight: bold;">2、肠胀气：</span>①宝宝表现睡眠不安、脸部胀红、腿弯曲和腹壁僵硬；②吐奶频繁；③臭屁连连，放屁时会带出少量大便；④偶尔出现泡沫便，排便较费尽，大便偏稀，次数较多等现象。护理方法同肠绞痛。</p><p><span style="font-weight: bold;">3、黄疸：</span>几乎所有的宝宝出生2—3天内都出现皮肤发黄，一般在2周内消退。但如果宝宝黄疸出现在出生后24小时内，或精神状态、进食情况不好、黄疸程度重、持续时间长那就需要请到医生来综合评估看是否是病理性黄疸。护理：①尽早开奶，多喂养，促进婴儿排便，促进胆红素排出；②沐浴后进行抚触，同时进行腹部按摩；③进行日光浴。</p><p><span style="font-weight: bold;">4、溢奶：</span>宝宝的胃体和我们成人的是不一样的，呈水平位，而且胃容量很小，入口（贲门括约肌）松弛，出口（幽门括约肌）却很紧张，所以进来的奶液很容易通过入口反流会回食道，也就是我们所说的吐奶/溢奶。只要宝宝溢奶后精神状态良好，且吐奶不是呈喷射状或夹杂血丝，都属于正常的生理现象，不必紧张哦！护理：①适当调整喂奶的时间，不要过于频繁，也不要在宝宝过度饥饿的时候才喂奶；②如果是奶瓶喂养，要减少空气的吸入，喂奶时奶液要充盈奶嘴；③喂奶后要进行竖抱拍嗝5—10分钟；④平时多给宝宝顺时针按摩腹部促进排气（喝奶后半小时内不要哦！）；⑤拍嗝后采取右侧卧位防止吐奶后误吸。</p><p><span style="font-weight: bold;">5、呛奶：</span>奶水过急或者喂奶时机不恰当都可能引起宝宝呛奶，奶液自口或鼻内流出、咳嗽、面色涨红、呼吸困难等情况，这时爸爸妈妈不免惊慌失措，一定要淡定一点及时采取措施。护理：①不要在宝宝严重哭闹时或哈哈大笑等情绪激动时喂奶；②母乳流量太快的话，喂奶时用剪刀手夹住乳晕后部，降低奶水流速；③检查奶嘴流量是否合适；④喂奶时宝宝体位应该是头高脚低；⑤宝宝喝奶时不能逗笑；⑥喂完奶后要拍嗝5-10分钟，再将宝宝右侧卧位至少30分钟再平卧；⑦如果不小心发生了呛奶，一定不要将宝宝竖着抱起来拍他的后背，正确的处理方式应该让宝宝在床上保持侧卧位的姿势，然后轻拍他的后背，帮助液体尽快从宝宝的呼吸道内排出，竖抱宝宝很可能让奶液流入呼吸道的更深部。</p><p><span style="font-weight: bold;">6、腹泻：</span>如果宝宝大便突然变得比之前次数多很多，而且变稀，那就要考虑腹泻了。护理：①如果你是母乳喂养，想想自己这两天的饮食有什么变化？②最关键的就预防脱水，增强母乳喂养或者少量多次喂补液盐水。但如果宝宝出现哭闹不止，囟门凹陷，小便很少暗黄、腹泻次数过多就要去看医生啦！</p><p><span style="font-weight: bold;">7、发热：</span>这个月龄的宝宝一旦月龄超过了37.5°就应该及时就医，不要再自己护理了。</p><p><span style="font-weight: bold;">8、鹅口疮：</span>如果宝宝唇内侧粘膜和舌面上出现了白色凝乳状物，你可以用干净的纱布擦拭一下，如果擦下去后基底部充血，那就是鹅口疮了。发生鹅口疮的原因可能是卫生不洁或者是过度清洁，滥用消毒剂。护理：①取制霉菌素一粒研成末，加入5ml水用棉签调匀，涂擦在患处；②消毒药棉蘸2%的小苏打水擦洗口腔，擦洗的时候动作要轻，每天1--2次；③服用益生菌制剂调整恢复肠道菌群；④恢复正常生活环境，不要滥用消毒剂，不要频繁用消毒湿巾给宝宝擦手擦嘴；⑤定时烫煮奶具。</p><p><span style="font-weight: bold;">9、马牙：</span>你可能会发现宝宝上腭中线和齿龈边缘上有黄白色小班点，就像新长的牙齿，其实这是俗称的“马牙”，系上皮细胞堆积或粘液腺分泌物积留所致。护理：一般在出生后数周至数月自行消失啦，不要自己处理，特别不要去挑破哦。</p><p><span style="color: rgb(77, 128, 191);">推荐课程：《新生儿体重下降家长不要慌》、《新生儿出现身上蜕皮是怎么回事》、《带你了解新生儿各种皮肤问题》、</span></p><p><span style="font-weight: bold;">10、螳螂嘴：</span>有的宝宝口腔内两颊部会出现厚厚的脂肪垫，俗称“螳螂嘴”。护理：这反而是对吸乳有利的，不要挑割，都会自行消失的，以免发生感染。</p><p><span style="font-weight: bold;">11、乳房肿大：</span>如果你发现宝宝出门几天后出现了乳腺肿大，如蚕豆或核桃大小，不要以为是宝宝性早熟啦！这是因为出生前胎儿受到母体激素影响造成，2-3周消退（少数也可能要持续1个月左右）。护理：正常护理就可以了，不要去挤压哦！</p><p><span style="font-weight: bold;">12、假月经：</span>部分女婴出生一周内阴道会出现白带及少量血性分泌物，不少爸妈惊呼怎么孩子这么小就来月经啦~其实这和前面说的乳房肿大是一个原因：妊娠后期母体雌性激素进入胎儿体内所致。护理：不必特殊处理，还是能正常清理臀部，会阴出的分泌物不要可以扒开清洗，用流动的水清洗外阴部就行了~持续2-3天后自然消失。</p><p><span style="font-weight: bold;">13、脱皮：</span>你的宝宝很有可能在出生后2～3天后开始脱皮。脱皮以躯干，四肢之末端为多见，而脸部一般无脱皮现象。不要紧张，只是很症状的生理现象，对宝宝没有任何的影响。护理：不需要特殊护理，洗完澡做完抚触后涂抹上润肤油或者润肤霜做好保湿工作就好啦~</p><p><span style="font-weight: bold;">14、红色的尿：</span>刚出生几天的宝宝，排出了像血一样的尿液，爸爸妈妈可吓坏了。其实这是因为新生儿白细胞分解较多，造成尿酸盐排泄较多，而这时候宝宝尿液比较少又很浓，就会觉得有点儿像血，一般几天之后就会自行消失了哦~</p><p><span style="font-weight: bold;">15、尿布疹：</span>尿布疹，也被称为“红屁股”。应该在宝宝每次大便后都用温水清洗宝宝臀部，就算没有大便也应该2-3小时更换一次。清洗后，可将宝宝放置在隔尿垫上，用棉柔巾蘸干水分后，等待宝宝臀部的水分被充分晾干，这一点十分重要。晾干后，给宝宝涂抹一些含有氧化锌的护臀霜，能帮助宝宝保持皮肤干爽。干爽的皮肤不容易出现尿布疹，从而达到预防的作用。</p><p><span style="color: rgb(77, 128, 191);">推荐课程：《如何清洁新生儿肚脐》、《新生儿正确抱姿有哪些》、《如何为新生儿洗澡及注意事项》、《新生儿纸尿裤选择及使用指导》</span></p><p><br/></p>';

var code8 = '<p><span style="font-size: 20px; color: rgb(247, 117, 103); font-weight: bold;">宝爸宝妈的本月课程清单： </span></p><p><span style="caret-color: rgb(77, 128, 191); color: rgb(77, 128, 191); font-family: -apple-system, BlinkMacSystemFont, &quot;PingFang SC&quot;, Helvetica, Tahoma, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Heiti, 黑体, sans-serif; font-size: 14px; white-space: pre-wrap;"><span style="caret-color: rgb(77, 128, 191); color: rgb(77, 128, 191); font-family: -apple-system, BlinkMacSystemFont, &quot;PingFang SC&quot;, Helvetica, Tahoma, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Heiti, 黑体, sans-serif; font-size: 14px; white-space: pre-wrap;"><span style="caret-color: rgb(77, 128, 191); color: rgb(77, 128, 191); font-family: -apple-system, BlinkMacSystemFont, &quot;PingFang SC&quot;, Helvetica, Tahoma, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Heiti, 黑体, sans-serif; font-size: 14px; white-space: pre-wrap;"><span style="caret-color: rgb(77, 128, 191); color: rgb(77, 128, 191); font-family: -apple-system, BlinkMacSystemFont, &quot;PingFang SC&quot;, Helvetica, Tahoma, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Heiti, 黑体, sans-serif; font-size: 14px; white-space: pre-wrap;"><span style="caret-color: rgb(77, 128, 191); color: rgb(77, 128, 191); font-family: -apple-system, BlinkMacSystemFont, &quot;PingFang SC&quot;, Helvetica, Tahoma, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Heiti, 黑体, sans-serif; font-size: 14px; white-space: pre-wrap;">《1月龄疫苗提醒及注意事项》<span style="caret-color: rgb(77, 128, 191); color: rgb(77, 128, 191); font-family: -apple-system, BlinkMacSystemFont, &quot;PingFang SC&quot;, Helvetica, Tahoma, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Heiti, 黑体, sans-serif; font-size: 14px; white-space: pre-wrap;">、</span><span style="caret-color: rgb(77, 128, 191); color: rgb(77, 128, 191); font-family: -apple-system, BlinkMacSystemFont, &quot;PingFang SC&quot;, Helvetica, Tahoma, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Heiti, 黑体, sans-serif; font-size: 14px; white-space: pre-wrap;">《母乳喂养的重要性》、</span></span>《1月龄宝宝生长发育及能力发展总结》、《宝宝出现这几个动作也许是非条件反射》<span style="caret-color: rgb(77, 128, 191); color: rgb(77, 128, 191); font-family: -apple-system, BlinkMacSystemFont, &quot;PingFang SC&quot;, Helvetica, Tahoma, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Heiti, 黑体, sans-serif; font-size: 14px; white-space: pre-wrap;">、</span></span>《新生儿体重下降家长不要慌》、《新生儿出现身上蜕皮是怎么回事》、《带你了解新生儿各种皮肤问题》、</span>《如何清洁新生儿肚脐》、《新生儿正确抱姿有哪些》、《如何为新生儿洗澡及注意事项》、《新生儿纸尿裤选择及使用指导》</span></span></p>';

Page({

    data:{

        report_inf:{},

        current_index:null

    },

    onLoad: function (options) {

        var  that = this;

        that.setData({

            report_time: options.report_time,
            report_inf:{},
            current_index:options.index
       
        });

        if (options.index == 1) {

            // WxParse.wxParse('article', 'html', code1,that, 5);

            that.get_growth_devlopment_report_inf();


        } else if (options.index == 2) {

            that.get_feed_sleep_report_inf();

            that.get_sleep_report_inf();

            // WxParse.wxParse('article', 'html', code2,that, 5);

        } else if (options.index == 3) {

            that.get_person_intro_report_inf();

            // WxParse.wxParse('article', 'html', code3,that, 5);


        } else if (options.index == 4) {

            that.get_ability_report_inf();

            // WxParse.wxParse('article', 'html', code4,that, 5);

        } else if (options.index == 5) {

            that.get_steep_bring_report_inf();

            // WxParse.wxParse('article', 'html', code5,that, 5);

        } else if (options.index == 6) {

            that.get_hight_aim_report_inf();

            // WxParse.wxParse('article', 'html', code6,that, 5);

        } else if (options.index == 7) {

            that.get_meet_question_report_inf();

            // WxParse.wxParse('article', 'html', code7,that, 5);

        } else if (options.index == 8) {

            that.get_base_class_report_inf();
            // WxParse.wxParse('article', 'html', code8,that, 5);

        }

    },
    // 生长发育
    get_growth_devlopment_report_inf:function(e){

        var that=this;

        wx.request({
            url: app.globalData.url +'index.php/api/User/h_weight',
            data:{

                uid:wx.getStorageSync('uid'),
                time: that.data.report_time
            },
            success:function(res){

                if(res.data.status==200){

                    console.log(res);

                    that.setData({

                        report_inf:res.data.data

                    });

                   


                }else{

                    wx.showToast({
                        title: '获取数据失败',
                        icon: 'loading',
                        duration: 1000
                    });
                    
                }


            },
            fail:function(res){

                wx.showToast({
                    title: '请求失败',
                    icon:'loading',
                    duration:1000
                });
            }
        })

    },
    get_feed_sleep_report_inf:function(e){

        var that = this;

        var report_inf = that.data.report_inf;
        

        wx.request({
            url: app.globalData.url + 'index.php/api/User/feeds',
            data: {

                uid: wx.getStorageSync('uid'),
                time: that.data.report_time
            },
            success: function (res) {

                if (res.data.status == 200) {

                    console.log(res);

                    report_inf.content = res.data.data.content;

                    that.setData({

                        report_inf: report_inf

                    });

                    


                } else {

                    wx.showToast({
                        title: '获取数据失败',
                        icon: 'loading',
                        duration: 1000
                    });

                }


            },
            fail: function (res) {

                wx.showToast({
                    title: '请求失败',
                    icon: 'loading',
                    duration: 1000
                });
            }
        })


    },
    get_sleep_report_inf: function (e) {

        var that = this;

        var report_inf = that.data.report_inf;


        wx.request({
            url: app.globalData.url + 'index.php/api/User/sleeps',
            data: {

                uid: wx.getStorageSync('uid'),
                time: that.data.report_time
            },
            success: function (res) {

                if (res.data.status == 200) {

                    report_inf.shuimian = res.data.data.shuimian;
                    // report_inf.shuimian = res.data.data.zhuyi;
                    // report_inf.shuimian = res.data.data.tiaozheng;

                    console.log(res.data.data.shuimian);

                    that.setData({

                        report_inf: report_inf

                    });

                    console.log(res.data.data.tiaozheng.content);

                    var code_str = res.data.data.tiaozheng.content;

                    WxParse.wxParse('get_sleep_report_tiaozheng_inf', 'html', res.data.data.tiaozheng.content, that, 5);

                    WxParse.wxParse('get_sleep_report_zhuyi_inf', 'html', res.data.data.zhuyi.content, that, 5);

                    // WxParse.wxParse('get_sleep_report_tiaozheng_inf', 'html', code_str, that, 5);

                    // WxParse.wxParseTemArray("get_sleep_report_inf_inf", 'html', , that, 5); 


                } else {

                    wx.showToast({
                        title: '获取数据失败',
                        icon: 'loading',
                        duration: 1000
                    });

                }


            },
            fail: function (res) {

                wx.showToast({
                    title: '请求失败',
                    icon: 'loading',
                    duration: 1000
                });
            }
        })


    },
    get_person_intro_report_inf:function(e){

        var that = this;

        var report_inf = that.data.report_inf;


        wx.request({
            url: app.globalData.url + 'index.php/api/Report/personality',
            data: {

                uid: wx.getStorageSync('uid'),
                time: that.data.report_time
            },
            success: function (res) {

                if (res.data.status == 200) {

                    that.setData({

                        report_inf: res.data.data

                    });

                    WxParse.wxParse('get_sleep_report_baba_inf', 'html', res.data.data.baba.content, that, 5);
                    WxParse.wxParse('get_sleep_report_jianyi_inf', 'html', res.data.data.jianyi.content, that, 5);
                    WxParse.wxParse('get_sleep_report_jiating_inf', 'html', res.data.data.jiating.content, that, 5);
                    WxParse.wxParse('get_sleep_report_meiri_inf', 'html', res.data.data.meiri.content, that, 5);

                    WxParse.wxParse('get_sleep_report_qinzi_inf', 'html', res.data.data.qinzi.content, that, 5);
                    WxParse.wxParse('get_sleep_report_wanju_inf', 'html', res.data.data.wanju.content, that, 5);
                    // WxParse.wxParse('get_sleep_report_zhuyi_inf', 'html', res.data.data.zhuyi.content, that, 5);


                } else {

                    wx.showToast({
                        title: '获取数据失败',
                        icon: 'loading',
                        duration: 1000
                    });

                }

            },
            fail: function (res) {

                wx.showToast({
                    title: '请求失败',
                    icon: 'loading',
                    duration: 1000
                });
            }
        })


        
    },
    
    get_ability_report_inf:function(e){

        var that = this;

        var report_inf = that.data.report_inf;


        wx.request({
            url: app.globalData.url + 'index.php/api/Report/ability',
            data: {

                uid: wx.getStorageSync('uid'),
                type:1,
                time: that.data.report_time
            },
            success: function (res) {

                if (res.data.status == 200) {

                    that.setData({

                        report_inf: res.data.data

                    });


                    WxParse.wxParse('get_sleep_report_content_inf', 'html', res.data.data.content.content, that, 5);


                } else {

                    wx.showToast({
                        title: '获取数据失败',
                        icon: 'loading',
                        duration: 1000
                    });

                }

            },
            fail: function (res) {

                wx.showToast({
                    title: '请求失败',
                    icon: 'loading',
                    duration: 1000
                });
            }
        })



    },
    get_steep_bring_report_inf:function(e){

        var that = this;

        var report_inf = that.data.report_inf;

        wx.request({
            url: app.globalData.url + 'index.php/api/Report/ability',
            data: {

                uid: wx.getStorageSync('uid'),
                type: 2,
                time: that.data.report_time
            },
            success: function (res) {

                if (res.data.status == 200) {

                    that.setData({

                        report_inf: res.data.data

                    });


                    WxParse.wxParse('get_sleep_report_content_inf', 'html', res.data.data.content.content, that, 5);


                } else {

                    wx.showToast({
                        title: '获取数据失败',
                        icon: 'loading',
                        duration: 1000
                    });

                }

            },
            fail: function (res) {

                wx.showToast({
                    title: '请求失败',
                    icon: 'loading',
                    duration: 1000
                });
            }
        })


    },
    get_hight_aim_report_inf:function(e){

        var that = this;

        var report_inf = that.data.report_inf;

        wx.request({
            url: app.globalData.url + 'index.php/api/Report/ability',
            data: {

                uid: wx.getStorageSync('uid'),
                type: 3,
                time: that.data.report_time
            },
            success: function (res) {

                if (res.data.status == 200) {

                    that.setData({

                        report_inf: res.data.data

                    });


                    WxParse.wxParse('get_sleep_report_content_inf', 'html', res.data.data.content.content, that, 5);


                } else {

                    wx.showToast({
                        title: '获取数据失败',
                        icon: 'loading',
                        duration: 1000
                    });

                }

            },
            fail: function (res) {

                wx.showToast({
                    title: '请求失败',
                    icon: 'loading',
                    duration: 1000
                });
            }
        })



    },
    get_meet_question_report_inf:function(e){

        var that = this;

        var report_inf = that.data.report_inf;

        wx.request({
            url: app.globalData.url + 'index.php/api/Report/ability',
            data: {

                uid: wx.getStorageSync('uid'),
                type:4,
                time: that.data.report_time
            },
            success: function (res) {

                if (res.data.status == 200) {

                    that.setData({

                        report_inf: res.data.data

                    });


                    WxParse.wxParse('get_sleep_report_content_inf', 'html', res.data.data.content.content, that, 5);


                } else {

                    wx.showToast({
                        title: '获取数据失败',
                        icon: 'loading',
                        duration: 1000
                    });

                }

            },
            fail: function (res) {

                wx.showToast({
                    title: '请求失败',
                    icon: 'loading',
                    duration: 1000
                });
            }
        })


    },
    get_base_class_report_inf:function(e){

        var that = this;

        var report_inf = that.data.report_inf;

        wx.request({
            url: app.globalData.url + 'index.php/api/Report/ability',
            data: {

                uid: wx.getStorageSync('uid'),
                type: 5,
                time: that.data.report_time
            },
            success: function (res) {

                if (res.data.status == 200) {

                    that.setData({

                        report_inf: res.data.data

                    });


                    WxParse.wxParse('get_sleep_report_content_inf', 'html', res.data.data.content.content, that, 5);


                } else {

                    wx.showToast({
                        title: '获取数据失败',
                        icon: 'loading',
                        duration: 1000
                    });

                }

            },
            fail: function (res) {

                wx.showToast({
                    title: '请求失败',
                    icon: 'loading',
                    duration: 1000
                });
            }
        })

        
    }



})