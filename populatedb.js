// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}*/

var async = require('async');
var User = require('./models/user');
var Story = require('./models/story');
var Genre = require('./models/genre');
var Author = require('./models/author');
var Chapter = require('./models/chapter');
var Bookmark = require('./models/bookmark');
var History = require('./models/history');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

mongoose.connect(mongoDB, { useNewUrlParser: true }, function(error) {
    if (error)
        throw error;

    console.log('Successfully connected');

    //Tạo tác giả
    //Thiên Tằm Thổ Đậu
    const mvcAuthor = new Author({
        _id: new mongoose.Types.ObjectId(),
        name: 'Thiên Tằm Thổ Đậu',
        info: 'Nhà văn Thiên Tằm Thổ Đậu, tên thật là Li Hu (Lý Hổ), sinh ngày 28 tháng 12 năm 1989 tại Đức Dương, Tứ Xuyên, Trung Quốc. Anh gia nhập hàng ngũ nhà văn mạng khi còn là học sinh trung học, bắt đầu từ nhà văn bạch kim, là đại diện cho các nhà văn thế hệ mới. Số tiền nhuận bút đầu tiên mà anh nhận được là 3000 tệ.\n' +
            '\n' +
            'Thiên Tằm Thổ Đậu bắt đầu sự nghiệp năm 2008 với tác phẩm đầu tay "Ma Thú Kiếm Thánh Dị Giới Tung Hoành". Tác phẩm này được viết vào năm 2007, ra đời giúp Thiên Tằm Thổ Đậu trở thành một trong những nhà văn mạng nổi tiếng hàng đầu Trung Quốc.\n' +
            '\n' +
            'Cuốn tiểu thuyết thứ 2 "Đấu Phá Thương Khung ra đời năm 2009, khi mới phát hành đã thu được doanh số rất lớn, nhận được hơn 140 triệu lượt truy cập, tạo ra sự gia tăng mạnh mẽ nhất trong năm 2009, trở thành cuốn tiểu thuyết có thu nhập cao nhất của Thiên Tằm Thổ Đậu (6.000.000 tệ tương đương gần 1 triệu USD), đồng thời cũng đưa Thiên Tằm Thổ Đậu vào vị trí nhà văn mạng hàng đầu không thể lay chuyển trong cộng đồng mạng và danh hiệu nhà văn Rookie của năm 2009.\n' +
            '\n' +
            'Đấu Phá Thương Khung nhanh chóng trở thành cuốn tiểu thuyết mạng phổ biến nhất, viết với tiến độ chậm, theo phương pháp ổn định mà phát triển. Truyện cũng được nhiều tác giả Truyện YY nghiên cứu, lấy làm mô hình cho tác phẩm của mình, trở thành cuốn tiểu thuyết nổi tiếng nhất của Thiên Tằm Thổ Đậu. Tháng 8 năm 2011, Thiên Tằm Thổ Đậu tải lên phần tiếp theo của Đấu Phá Thương Khung trong khi viết tác phẩm thứ ba. Sau đó Đấu Phá Thương Khung được công ty ChangYou, một nhà phát triển game danh tiếng, phát triển trong 3 năm, sử dụng engine Pyro Enigma để xây dựng thành game MMORPG 3D cùng tên. Game được đích thân Thiên Tằm Thổ Đậu ký tham gia công tác phát triển để đảm bảo những hình ảnh được đưa ra sẽ là chân thực nhất với trí tưởng tượng mà nhà văn đã truyền tải vào tác phẩm của mình.'
    });

    mvcAuthor.save(function (error) {
        if(error) throw error;
    });
    const ThienTamThoDau = mvcAuthor._id;
    console.log('Author Done');

    //Tạo thể loại
    //Huyền Huyễn
    const mvcGenre = new Genre({
        _id: new mongoose.Types.ObjectId(),
        name: 'Huyền Huyễn',
        info: 'Truyện có những yếu tố huyền bí, khoa học khó giải thích.'
    });

    mvcGenre.save(function (error) {
        if(error) throw error;
    });
    const HuyenHuyen = mvcGenre._id;
    console.log('Genre Done');

    //Tạo người dùng
    //nhoknguyen00
    const mvcUser = new User({
        username: 'nhoknguyen00',
        password: '123',
		email: 'miketuannguyen@gmail.com'
    });
    mvcUser.password = mvcUser.generateHash(mvcUser.password);

    mvcUser.save(function (error) {
        if(error) throw error;
    });
    const Nguyen = mvcUser._id;
    console.log('User Done');

    //Tạo truyện
    //Đấu Phá Thương Khung
    mvcStory = new Story({
        _id: new mongoose.Types.ObjectId(),
        name: 'Đấu Phá Thương Khung',
        info: '- Đấu Phá Thương Khung là một câu chuyện huyền huyễn đặc sắc kể về Tiêu Viêm, một thiên chi kiêu tử với thiên phú tu luyện mà ai ai cũng hâm mộ, bỗng một ngày người mẹ mất đi đễ lại di vật là một chiếc giới chỉ màu đen nhưng từ khi đó Tiêu Viêm đã mất đi thiên phú tu luyện của mình.\n' +
            '\n' +
            '- Từ thiên tài rớt xuống làm phế vật trong 3 năm, rồi bị vị hôn thê thẳng thừng từ hôn, làm dấy lên ý chí nam nhi của mình, Tiêu Viêm nhờ di vật của mẫu thân để lại là 1 chiếc hắc giới chỉ (nhẫn màu đen)Tiêu Viêm gặp được hồn của Dược Lão (Dược Trần – Dược tôn giả) 1 đại luyện dược tông sư của đấu khí đại lục…\n' +
            '\n' +
            '- Từ đó cuộc đời của Tiêu Viêm có những biến hóa gì? Gặp được các đại ngộ gì? Thân phận thật sự của Huân Nhi (thanh mai trúc mã lúc nhỏ của Tiêu Viêm) ra sao? Bí mật của gia tộc hắn là gì? Cùng theo dõi bộ truyện Đấu Phá Thương Khung để có thể giải đáp các thắc mắc này các bạn nhé!',
        genre: HuyenHuyen,
        author: ThienTamThoDau,
        finished: 'Hoàn thành',
        img: 'img/dauphathuongkhung.jpg',
    });

    mvcStory.save(function (error) {
        if(error) throw error;
    });
    const DauPha = mvcStory._id;
    console.log('Story Done');

    //Tạo chương
    //chương 1 Đấu Phá Thương Khung
    mvcChapter = new Chapter({
        _id: new mongoose.Types.ObjectId(),
        name: 'Chương 1: Thiên tài rơi rụng',
        content: '"Đấu lực, ba đoạn"\n' +
            '\n' +
            'Nhìn năm chữ to lớn có chút chói mắt trên trắc nghiệm ma thạch, thiếu niên mặt không chút thay đổi, thần sắc tự giễu, nắm chặt tay, bởi vì dùng lực quá mạnh làm móng tay đâm thật sâu vào trong lòng bàn tay, mang đến từng trận trận đau đớn trong tâm hồn...\n' +
            '\n' +
            '"Tiêu Viêm, đấu lực, ba đoạn! Cấp bậc: Cấp thấp!".\n' +
            '\n' +
            'Bên cạnh trắc nghiệm ma thạch, một vị trung niên nam tử, thoáng nhìn tin tức trên bia, ngữ khí hờ hững công bố…\n' +
            '\n' +
            'Trung niên nam tử vừa nói xong, không có gì ngoài ý muốn, đám người trên quảng trường lại nổi lên trận trận châm chọc tao động\n' +
            '\n' +
            '"Ba đoạn? Hắc hắc, quả nhiên không ngoài dự đoán của ta, ""Thiên tài" này một năm rồi vẫn dậm chân tại chỗ a!"\n' +
            '\n' +
            '"Ai, phế vật này thật sự làm mất hết cả mặt mũi gia tộc."\n' +
            '\n' +
            '"Nếu tộc trưởng không phải phụ thân của hắn. Loại phế vật này sớm đã bị đuổi khỏi gia tộc, tự sinh tự diệt rồi, làm gì còn có cơ hội ở gia tộc ăn không uống không."\n' +
            '\n' +
            '"Ai..., thiên tài thiếu niên năm đó của Văn Ô Thản thành, tại sao hôm nay lại lạc phách thành bộ dáng này cơ chứ?"\n' +
            '\n' +
            '"Ai mà biết được? Có lẽ do làm việc gì đó trái với lương tâm, làm thần linh nổi giận đó mà…"\n' +
            '\n' +
            'Chung quanh truyền đến cười nhạo cùng thanh âm tiếc hận, dừng ở trong tai của thiếu niên, tựa như một chiếc dao nhọn hung hăng đâm vào tim hắn, khiến hô hấp của thiếu niên trở nên có chút dồn dập.\n' +
            '\n' +
            'Thiếu niên chậm rãi ngẩng đầu, lộ ra khuôn mặt thanh tú non nớt, con ngươi đen nhánh nhẹ nhàng đảo qua đám bạn cùng lứa tuổi đang trào phúng chung quanh, khóe miệng thiếu niên tự giễu, tựa hồ trở nên càng thêm chua xót.\n' +
            '\n' +
            '"Những người này, đều thừa hơi như vậy sao? Có lẽ vì ba năm trước bọn họ từng trước mặt mình lộ ra bộ mặt tươi cười nhún nhường, cho nên hiện tại muốn đòi trở về đây mà…" Mỉm cười chua xót, Tiêu Viêm chán nản xoay người, im lặng đi tới cuối hàng, thân ảnh cô đơn cùng thế giới xung quanh trở nên có chút lạc lõng.\n' +
            '\n' +
            '"Người tiếp theo, Tiêu Mị"\n' +
            '\n' +
            'Nghe người tiến hành trắc nghiệm gọi tên, một thiếu nữ rất nhanh từ trong đám người đi ra, tiếng nghị luận ở xung quanh trở nên nhỏ đi rất nhiều, từng đạo ánh mắt nóng bỏng tập trung lên trên khuôn mặt của thiếu nữ…\n' +
            '\n' +
            'Thiếu nữ tuổi không quá mười bốn, dù chưa thể coi là tuyệt sắc, nhưng khuôn mặt non nớt kia cũng ẩn chứa trong đó một tia vũ mị nhàn nhạt, thanh thuần cùng vũ mị, một tập hợp mâu thuẫn, càng khiến nàng trở thành tiêu điểm của toàn trường…\n' +
            '\n' +
            'Thiếu nữ nhanh chóng đi lên, tay vuốt ve ma thạch bi quen thuộc, sau đó chậm rãi nhắm mắt…\n' +
            '\n' +
            'Tại lúc thiếu nữ nhắm mắt, ma thạch bi đen nhánh lại hiện lên quang mang…\n' +
            '\n' +
            '"Đấu khí: Bảy đoạn!"\n' +
            '\n' +
            '"Tiêu Mị, Đấu khí: Bảy đoạn! Cấp bậc: Cao cấp"\n' +
            '\n' +
            '"Da!" Nghe trắc ngiệm viên đọc lên thành tích, thiếu nữ ngẩng mặt lên đắc ý cười…\n' +
            '\n' +
            '"Sách sách, bảy đoạn đấu khí, cứ theo tiến độ như vậy, chỉ sợ không quá ba năm thời gian, nàng có thể trở thành một đấu giả chính thức rồi…"\n' +
            '\n' +
            '"Không hổ là hạt giống của gia tộc a…"\n' +
            '\n' +
            'Nghe đám người truyền đến trận trận thanh âm hâm mộ, thiếu nữ tươi cười lại rạng rỡ thêm vài phần, tâm hư vinh, là thứ mà rất nhiều cô gái đều không thể kháng cự…\n' +
            '\n' +
            'Nhớ đến ngày thường hay cùng mấy tỷ muội đàm tiếu, tầm mắt Tiêu Mị bỗng nhiên xuyên qua đám người, dừng trên một đạo thân ảnh cô đơn…\n' +
            '\n' +
            'Nhíu mày suy nghĩ một chút, Tiêu Mị vứt bỏ ý niệm trong đầu, hiện tai hai người đã không còn cùng một giai tầng, lấy biểu hiện của Tiêu Viêm mấy năm này, sau khi trưởng thành, nhiều nhất cũng chỉ có thể làm nhân viên hạ tầng của gia tộc mà thôi, mà thiên phú vĩ đại như nàng, sẽ trở thành trọng điểm bồi dưỡng của gia tộc, có thể nói là tiền đồ không thể hạn lượng.\n' +
            '\n' +
            '"Ai…" Khẽ thở dài một tiếng, trong đầu Tiêu Mị bỗng hiện ra hình ảnh một thiếu niên ý khí phong phát ba năm trước đây, bốn tuổi luyện khí, mười tuổi có chín đoạn đấu khí, mười một tuổi đột phá mười đoạn đấu khí, ngưng tụ thành công đấu khí toàn, trở thành đấu giả trẻ nhất trong vòng trăm năm của gia tộc!\n' +
            '\n' +
            'Thiếu niên trước kia, bộ dáng tự tin lại thêm tiềm lực không thể hạn lượng, không biết đã làm bao cô gái động xuân tâm, đương nhiên trong đó cũng có cả Tiêu Mị.\n' +
            '\n' +
            'Nhưng con đường của thiên tài, từ trước đến giờ luôn luôn trắc trở, ba năm trước, khi danh vọng của thiếu niên thiên tài đạt tới đỉnh cao nhất, cũng là lúc đột ngột phải thừa nhận đả kích tàn khốc nhất, không chỉ có vừa vất vả khổ tu ngưng tụ đấu khí toàn trong một đêm biến mất, mà đấu khí theo thời gian trôi qua lại càng trở nên càng ngày càng ít đi một cách quỷ dị.\n' +
            '\n' +
            'Kết quả của đấu khí biến mất, đó chính là thực lực không ngừng giảm đi.\n' +
            '\n' +
            'Từ thiên tài, một đêm trở thành một thứ mà ngay cả người bình thường cũng không bằng, loại đả kích này, khiến thiếu niên từ đó thất hồn lạc phách, cái tên thiên tài, cũng dần dần bị khinh thường cùng châm chọc thay thế.\n' +
            '\n' +
            'Trèo càng cao, ngã càng đau, lần ngã này có lẽ sẽ không còn cơ hội đứng dậy nữa.\n' +
            '\n' +
            '"Người tiếp theo, Tiêu Huân Nhi!"\n' +
            '\n' +
            'Trong âm thanh huyên náo của đám người, thanh âm của trắc nghiệm viên lại vang lên.\n' +
            '\n' +
            'Theo đó là một cái tên thanh nhã vang lên, đám người bỗng trở nên im lặng, ánh mắt đều dịch chuyển.\n' +
            '\n' +
            'Tại nơi ánh mắt tụ hội, một thiếu nữ áo tím đang đạm nhã đứng đó, khuôn mặt non nớt bình tĩnh, không vì bị mọi người chú ý mà thay đổi chút nào.\n' +
            '\n' +
            'Thiếu nữ khí chất lãnh đạm tựa như đóa sen mới nở, tuổi nhỏ đã có khí chất thoát tục, khó có thể tưởng tượng sau này lớn lên, thiếu nữ này sẽ khuynh quốc khuynh thành đến mức độ nào…\n' +
            '\n' +
            'Tử y thiếu nữ này, nói về mỹ mạo cùng khí chất, so với Tiêu Mị trước đó lại càng hơn vài phần, khó trách mọi người đều có động tác như vậy.\n' +
            '\n' +
            'Khẽ bước tới, thiếu nữ tên Tiêu Huân Nhi đi tới phía trước ma thạch bi, bàn tay nhỏ bé đưa lên, ống tay áo theo đó mà chảy xuống, lộ ra da thịt trắng nõn nà, sau đó đặt nhẹ tay lên bia đá…\n' +
            '\n' +
            'Sau một khoảng trầm tĩnh, trên thạch bia hiện lên ánh sáng chói mắt.\n' +
            '\n' +
            '"Đấu khí: Chín đoạn! Cấp bậc: Cao cấp!"\n' +
            '\n' +
            'Nhìn mấy chữ trên thạch bia, giữa sân trở nên tĩnh lặng.\n' +
            '\n' +
            '"…Đã tới chín đoạn rồi, thật là khủng bố mà! Người đứng đầu trong giới trẻ của gia tộc, chỉ sợ không ai ngoài Huân Nhi tiểu thư a." Yên tĩnh qua đi, các thiếu niên xung quanh đều không tự chủ được nuốt một ngụm nước miếng, ánh mắt tràn ngập kính sợ…\n' +
            '\n' +
            'Đấu khí, con đường bắt buộc phải đi qua của mỗi đấu giả, sơ giai đấu khí chia từ một đến mười đoạn, đấu khí trong cơ thể đạt tới mười đoạn, là có thể ngưng tụ đấu khí toàn, trở thành một đấu giả được người khác tôn trọng.\n' +
            '\n' +
            'Trong đám người, Tiêu Mị nhíu mày nhìn cô gái áo tím đứng trước bia đá, trên mặt hiện lên một tia ghen tị…\n' +
            '\n' +
            'Nhìn tin tức trên thạch bia, khuôn mặt hờ hững của trung niên trắc nghiệm viên bên cạnh cũng lộ ra một tia mỉm cười hiếm hoi, đối với cô gái thoáng dùng âm thanh cung kính nói: "Huân Nhi tiểu thư, nửa năm sau, tiểu thư hẳn sẽ có thể ngưng tụ đấu khí toàn, nếu thành công, mười bốn tuổi trở thành một đấu giả chân chính, tiểu thư sẽ là người thứ hai của Tiêu gia trong trăm năm nay!"\n' +
            '\n' +
            'Đúng vậy, người thứ hai, người thứ nhất đó chính là thiên tài đã mất đi ánh hào quang - Tiêu Viêm.\n' +
            '\n' +
            '"Cám ơn." Thiếu nữ khẽ gật đầu, khuôn mặt bình thản không vì được hắn khích lệ mà vui sướng, im lặng xoay người, dưới ánh mắt nóng bỏng của mọi người, chậm rãi đi đến cuối đám người, tới trước mặt thiếu niên đang suy sụp…\n' +
            '\n' +
            '"Tiêu Viêm ca ca." Tại lúc đến bên cạnh thiếu niên, thiếu nữ dừng chân, đối với Tiêu Viêm cung kính cúi người, trên khuôn mặt xinh đẹp, cư nhiên lộ ra nụ cười thanh nhã khiến các cô gái chung quanh cũng phải trở nên ghen tị.\n' +
            '\n' +
            '"Huynh bây giờ còn có tư cách để muội gọi như vậy sao?" Nhìn trước mặt đã trở thành khỏa minh châu sáng nhất trong gia tộc kia, Tiêu Viêm chua xót nói, sau khi bản thân hắn tụt dốc nàng chính là một trong số cực ít những người vẫn bảo trì tôn kính đối với hắn.\n' +
            '\n' +
            '"Tiêu Viêm ca ca, trước kia huynh đã từng nói với Huân Nhi, có thể buông, mới có thể cầm lấy, thu phóng tự nhiên mới là người tự tại!" Tiêu Huân Nhi mỉm cười ôn nhu nói, giọng nói non nớt, khiến người tâm đã chết cũng cảm thấy ấm lòng.\n' +
            '\n' +
            '"Ha, ha, người tự tại sao? Huynh cũng chỉ biết nói mà thôi, muội xem bộ dáng hiện tại của huynh đi, giống một người tự tại sao? Hơn nữa… thế giới này, cơ bản cũng không phải là thế giới của huynh." Tiêu Viêm cười tự giễu nói.\n' +
            '\n' +
            'Đối với sự suy sụp của Tiêu Viêm, Tiêu Huân Nhi khẽ cau mày, thật lòng nói: "Tiêu Viêm ca ca, tuy muội cũng không biết huynh vì sao lại bị như vậy, bất quá, Huân Nhi tin tưởng, huynh sẽ lại đứng dậy, lấy lại vinh quang và tôn nghiêm của huynh…" Kết thúc câu nói, khuôn mặt trắng nõn của thiếu nữ lần đầu tiên hiện lên nét ửng đỏ nhàn nhạt: "Tiêu viêm ca ca năm đó, thực ra rất hấp dẫn…"\n' +
            '\n' +
            '"A a…" Đối với lời nói thẳng thắn của thiếu nữ, thiếu niên xấu hổ cười một tiếng, nhưng lại không nói gì, người không phong lưu phí hoài tuổi trẻ, nhưng hắn hiện tại thực sự đã không còn tư cách cùng tâm tình đó nữa, yên lặng xoay người, chậm rãi đi ra khỏi quảng trường…\n' +
            '\n' +
            'Đứng tại chỗ nhìn theo bóng lưng cô độc của thiếu niên, Tiêu Huân Nhi trù trừ một thoáng, sau đó bỏ lại tiêng sói tru tiếng ghen tị tại phía sau, bước nhanh theo, cùng thiếu niên sóng vai bước đi…\n',
        story: DauPha,
        createdDate: Date.now()
    });
    const chap1DauPha = mvcChapter._id;

    mvcChapter.save(function (error) {
        if(error) throw error;
    });
    console.log('Chapter Done');

    mvcBookmark = new Bookmark({
        _id: mongoose.Types.ObjectId(),
        story: DauPha,
        user: Nguyen
    });

    mvcBookmark.save(function(error){
        if(error) throw error;
    });
    console.log('Bookmark Done');

    mvcHistory = new History({
        _id: mongoose.Types.ObjectId(),
        chapter: chap1DauPha,
        user: Nguyen,
        createdDate: Date.now()
    });

    mvcHistory.save(function(error){
        if(error) throw error;
    });
    console.log('History Done');
});