# Lỗi chưa fix
#1 Data.Json chỉ chạy khi mở live server (mentor nhớ mở live server nha, không thì mình bị 0 điểm {0,0}). Chạy offline thì nó báo lỗi: 
Yêu cầu Cross-Origin đã bị chặn: Same Origin Policy không cho phép đọc tài nguyên từ xa ở file:/..../data/Data.json. (Lý do: CORS yêu cầu không http)

#2 Sản phẩm không tự động load khi mới vào web: Lúc đầu mình có gắn nav-link active mặc định nhưng không hiểu vì sao lúc mới vào web các sản phẩm của nav-link 
đó không load, phải chuyển hướng sang nav-link khác mới chịu load, vì thế mình bỏ nav-link active mặc định luôn, muốn load sản phẩm phải click chuột vô nav-link trước,
hơi kì nhưng vẫn đỡ hơn đang active mà ko hiện sản phẩm =]]
