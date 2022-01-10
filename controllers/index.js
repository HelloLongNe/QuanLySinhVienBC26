console.log(axios)

function getApiData (){
    var promise = axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', // thuộc tính đường dẫn do backend quy định
        method:'GET', // giao thức backend quy định
        responseType:'json' //json: mặc định, text: đọc định dạng chuỗi, document: thẻ
    });
    // định nghĩa trường hợp call api thành công
    promise.then(function(result){
        //hàm này sẽ tự gọi khi api thành công
        console.log('result', result.data);
        //gọi hàm tạo giao diện 
        renderTable(result.data);
    })
        //định ngghixa trường hợp gọi api thất bại
    promise.catch(function(error){
            console.log(`error`, error)
     })
    
}
getApiData();
function renderTable(mangSinhVien){
    var htmlContent = '';
    for (var i = 0; i < mangSinhVien.length; i++){
        //moi lan duyet lay ra 1 sinh vien
        var sinhVien = mangSinhVien[i];
        htmlContent += `
            <tr>
                <td>${sinhVien.maSinhVien}</td>
                <td>${sinhVien.tenSinhVien}</td>
                <td>${sinhVien.email}</td>
                <td>${sinhVien.soDienThoai}</td>
                <td>${sinhVien.loaiSinhVien}</td>
                <td>${sinhVien.diemToan}</td>
                <td>${sinhVien.diemRenLuyen}</td>
                <td style = 'width:200px' >
                    <button class='btn btn-danger'  onclick="xoaSinhVien('${sinhVien.maSinhVien}')">   Xóa  </button>
                    <button class='btn btn-primary' onclick="suaSinhVien('${sinhVien.maSinhVien}')">Sửa</button>
                </td>
            </tr>
        `
    }
    document.querySelector('tbody').innerHTML = htmlContent;
}
//thêm sinh viên
document.querySelector('#btnThemSinhVien').onclick = function(){
    //lấy thông tin người dùng nhập từ các thẻ input
    var sinhVien = new SinhVien();
    sinhVien.maSinhVien = document.querySelector('#maSinhVien').value; 
    sinhVien.tenSinhVien = document.querySelector('#tenSinhVien').value; 
    sinhVien.email = document.querySelector('#email').value; 
    sinhVien.soDienThoai = document.querySelector('#soDienThoai').value; 
    sinhVien.diemToan = document.querySelector('#diemToan').value; 
    sinhVien.diemLy = document.querySelector('#diemLy').value; 
    sinhVien.diemHoa = document.querySelector('#diemHoa').value; 
    sinhVien.diemRenLuyen = document.querySelector('#diemRenLuyen').value; 
    console.log(`sinhVien`, sinhVien)



    //dùng axios gọi api
    var promise = axios ({
        url:'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien',
        method: 'POST',
        data: sinhVien // {"maSinhVien":1, "tenSinhVien":"Long"}
    })
    //thành công 
    promise.then(function(result){
        console.log(`result`, result.data)
        //gọi lại hàm lấy api lấy danh sách sinh viên
        // window.location.reload();
        getApiData();
    })
    //thất bại
    promise.catch(function(err){
        console.log(`error`, err);
    })
}
//xóa sinh viên api
function xoaSinhVien(maSinhVienClick){
    
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien='+maSinhVienClick,
        method:'DELETE'
    })
    //thành công
    promise.then(function(result){
        console.log(`result`, result)
        getApiData();
    })
    //that bai
    promise.catch(function(err){
        console.log(err.response?.data)
    })
}
function suaSinhVien(maSinhVienClick){
    console.log(`maSinhVienClick`, maSinhVienClick)

    var promise = axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien='+ maSinhVienClick,
        method: 'GET'
    });
    //thanh cong
    promise.then(function(result){
        console.log(result);
        var sinhVien = result.data;
        //gán các giá trị lên control phía trên
        
        document.querySelector('#tenSinhVien').value = sinhVien.tenSinhVien;
        document.querySelector('#email').value = sinhVien.email;
        document.querySelector('#soDienThoai').value = sinhVien.soDienThoai;
        document.querySelector('#diemToan').value = sinhVien.diemToan;
        document.querySelector('#diemLy').value = sinhVien.diemLy;
        document.querySelector('#diemHoa').value = sinhVien.diemHoa;
        document.querySelector('#diemRenLuyen').value = sinhVien.diemRenLuyen;
        document.querySelector('#maSinhVien').value =sinhVien.maSinhVien;
        document.querySelector('#maSinhVien').disabled = true;
    })
    promise.catch(function(err){
        console.log(err.response.data)
    })
}
document.querySelector('#btnCapNhatThongTin').onclick = function(){
    //lấy thông tin người dùng nhập từ các thẻ input
    var sinhVien = new SinhVien();
    sinhVien.maSinhVien = document.querySelector('#maSinhVien').value; 
    sinhVien.tenSinhVien = document.querySelector('#tenSinhVien').value; 
    sinhVien.email = document.querySelector('#email').value; 
    sinhVien.soDienThoai = document.querySelector('#soDienThoai').value; 
    sinhVien.diemToan = document.querySelector('#diemToan').value; 
    sinhVien.diemLy = document.querySelector('#diemLy').value; 
    sinhVien.diemHoa = document.querySelector('#diemHoa').value; 
    sinhVien.diemRenLuyen = document.querySelector('#diemRenLuyen').value; 
    console.log(`sinhVien`, sinhVien)

    //gọi api cập nhập
    var promise = axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien='+sinhVien.maSinhVien,
        method:'PUT',
        data: sinhVien
    });
    promise.then(function(result){
        console.log(result)
        getApiData();
    })
    promise.catch(function(err){
        console.log(err.response.data)
    })
}