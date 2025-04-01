---
title: Lập trình cơ bản
description: Lập trình cơ bản Cpp.
pubDate: "8 12 2024"
published: true
tags: [programming, cpp]
---

Lập trình cơ bản trong 3 tháng
<!--truncate-->

### Bài 1: Làm quen với C++

**Câu 1**:

- Làm quen với cấu trúc chung của một chương trình C:
  - Mở C-free/Dev-C, vào File/New/Source file.
  - Lưu file với phần mở rộng là .cpp.
  - Thêm `#include <iostream>`.
  - Viết chương trình "Hello, World!" và các biến thể của nó, biên dịch và chạy chương trình.

**Câu 2**:

- Viết thiệp mời dự sinh nhật có dạng:

```markdown
*******************************************
THIỆP MỜI

Tôi dự lễ sinh nhật của mình
Vào lúc 19h ngày 20/10/2016
Tại: 05/42 Vĩnh Viễn, TP. HCM
Rất mong được đón tiếp!

Hồ Lê Thu
*******************************************
```

**Câu 3**:

- Viết chương trình nhập và xuất ra màn hình:
  - Một số nguyên.
  - Một số thực.
  - Một ký tự.
  - Hai số nguyên, tính tổng, hiệu của hai số và xuất kết quả ra màn hình.

#### Nâng cao

**Câu 4**: Viết chương trình nhập vào bán kính r của một hình tròn. Tính chu vi và diện tích của hình tròn. In các kết quả lên màn hình.

**Câu 5**: Viết chương trình thực hiện:
a. Nhập vào hai số nguyên. Xuất ra màn hình giá trị lớn nhất.
b. Nhập vào ba số nguyên. Xuất ra màn hình giá trị lớn nhất.

**Câu 6**: Nhập vào 3 số nguyên dương a, b, c. Kiểm tra xem 3 số đó có lập thành tam giác không? Nếu có, hãy tính chu vi và diện tích của tam giác theo công thức:

Chu vi $CV = a + b + c$.

Diện tích $S = sqrt(p *(p - a)* (p - b) * (p - c))$, trong đó: $p = CV / 2$.

Xuất các kết quả ra màn hình.

**Câu 7**: Viết chương trình đảo ngược một số nguyên dương có đúng 3 chữ số.

- hướng dẫn:

Lần lượt lấy các chữ số dùng phép chia / và phép chia lấy phần dư % và in ra màn hình theo thứ tự:

- Chữ số hàng đơn vị
- Chữ số hàng chục
- Chữ số hàng trăm.
Ví dụ:

Với số 234, thực hiện:

- 234 % 10 = 4 (lấy chữ số hàng đơn vị)
- 234 / 10 = 23
- 23 % 10 = 3 (lấy chữ số hàng chục)
- 23 / 10 = 2
- 2 % 10 = 2 (lấy chữ số hàng trăm)

kết quả

- Hàng đơn vị: 4
- Hàng chục: 3
- Hàng trăm: 2

### Bài 2: Cấu trúc điều kiện If và switch

**Câu 1:**

- Viết chương trình giải phương trình bậc nhất $ax+b=0$ với a,b nhập từ bàn phím.

**Câu 2:**

- Viết chương trình giải phương trình bậc hai $ax^2+bx+c=0$. Với a,b,c nhập từ bàn phím.

<details>
<summary>Click to view full code !</summary>

```cpp
# include <iostream>
# include <cmath>

int main()
{
    float a, b, c;
    std::cout << "------Giai pt bac hai Ax^2+Bx+C=0------\n";
    std::cout << "Nhap a: ";
    std::cin >> a;
    std::cout << "Nhap b: ";
    std::cin >> b;
    std::cout << "Nhap c: ";
    std::cin >> c;

    if (a == 0)
    {
        if (b == 0)
        {
            if (c == 0)
            {
                std::cout << "Pt vo so nghiem";
            }
            else
            {
                std::cout << "Pt vo nghiem";
            }
        }
        else
        {
            std::cout << "Phuong trinh co nghiem x=-c/b=" << -c / b;
        }
    }
    else
    {
        float x1, x2, Delta;
        Delta = b * b - 4 * a * c;
        std::cout << "Delta=" << Delta;
        if (Delta < 0)
        {
            std::cout << "\nPt vo nghiem";
        }
        else if (Delta == 0)
        {
            std::cout << "\nPhuong trinh co nghiem kep x=" << -b / (2 * a);
        }
        else
        {
            x1 = (-b + std::sqrt(Delta)) / (2 * a);
            x2 = (-b - std::sqrt(Delta)) / (2 * a);
            std::cout << "\nPhuong trinh co 2 nghiem: x1=" << x1 << ", x2=" << x2;
        }
    }
    return 0;
}
```

</details>

**Câu 3:**

- Nhập vào 3 số a,b,c. Kiểm tra xem 3 số có lập thành tam giác không? Nếu có, hãy cho biết loại tam giác.

**Câu 4:**

- Viết chương trình hiển thị cách đọc số nguyên có hai chữ số. Ví dụ: 21 -> "hai mốt".

<details>
<summary>Click to view full code !</summary>

```cpp
#include <iostream>

using namespace std;

int main() {
    int n;
    cout << "Nhap vao so nguyen co hai chu so\n";
    do {
        cout << "Enter number n: ";
        cin >> n;
        if (n < 0 || n > 100)
            cout << "Nhap sai, nhap lai\n";
    } while (n < 0 || n > 100);

    switch (n / 10) {
        case 1: cout << "Muoi"; break;
        case 2: cout << "Hai Muoi"; break;
        case 3: cout << "Ba Muoi"; break;
        case 4: cout << "Bon Muoi"; break;
        case 5: cout << "Nam Muoi"; break;
        case 6: cout << "Sau Muoi"; break;
        case 7: cout << "Bay Muoi"; break;
        case 8: cout << "Tam Muoi"; break;
        case 9: cout << "Chin Muoi"; break;
    }

    switch (n % 10) {
        case 1: cout << " mot"; break;
        case 2: cout << " hai"; break;
        case 3: cout << " ba"; break;
        case 4: cout << " bon"; break;
        case 5: cout << " nam"; break;
        case 6: cout << " sau"; break;
        case 7: cout << " bay"; break;
        case 8: cout << " tam"; break;
        case 9: cout << " chin"; break;
    }

    return 0;
}
```

</details>

**Câu 5:**

- Viết chương trình nhập vào tháng của một năm và cho biết số ngày của tháng đó.

<details>
<summary>Click to view full code !</summary>

```cpp
#include <iostream>
using namespace std;

void calendar(int month) {
    int year;
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        cout << "Day: 31" << endl;
    } else if (month == 4 || month == 6 || month == 9 || month == 11) {
        cout << "Day: 30" << endl;
    } else if (month == 2) {
        cout << "Enter year: ";
        cin >> year;
        if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) {
            cout << "Day: 29" << endl;
        } else {
            cout << "Day: 28" << endl;
        }
    }
}

int main() {
    int month;
    do {
        cout << "Enter month: ";
        cin >> month;
        if (month < 1 || month > 12) {
            cout << "Enter again." << endl;
        }
    } while (month < 1 || month > 12);

    calendar(month);
    return 0;
}
```

</details>

**Câu 6:**

- Nhập một số, kiểm tra số đó có phải là số nguyên tố hay không? In kết quả ra màn hình.

**Câu 7:**

- Viết chương trình tính tiền taxi dựa trên số km nhập vào.

1 km đầu tiên là 5000 đồng.
Mỗi 200m tiếp theo là 1000 đồng.
Nếu lớn hơn 30 km thì mỗi km thêm sẽ là 3000 đồng.
Hãy nhập số km, sau đó in ra số tiền phải trả.

<details>
<summary>Click to view full code !</summary>

```cpp
#include <iostream>
#include <cmath> // for std::ceil, if needed

using namespace std;

int main() {
    float n;
    cout << "Enter distance n: ";
    cin >> n;
    cout << "\n          Distance is " << n << " km" << endl;

    if (n <= 1) {
        int s = 5000;
        cout << "              Fee: " << s << " VND" << endl;
    } else if (n > 1 && n <= 30) {
        int t;
        int tien;
        int duong = static_cast<int>(n * 1000);
        if (duong % 200 == 0) {
            t = (duong - 1000) / 200;
        } else {
            t = (duong - 1000) / 200 + 1;
        }

        tien = t * 1000 + 5000;
        cout << "              Fee: " << tien << " VND" << endl;
    } else if (n > 30) {
        int tien = (static_cast<int>(n) - 30) * 3000 + 150000;
        cout << "              Fee: " << tien << " VND" << endl;
    }

    return 0;
}
```

</details>

### Bài 3: Cấu trúc lặp - do while, while và for

**Câu 1:**

- Viết chương trình hiển thị 10 dòng: "XIN CHÀO CÁC BẠN".
- Viết chương trình hiển thị n dòng: "XIN CHÀO CÁC BẠN", với n nhập từ bàn phím.

**Câu 2:**

- Viết chương trình hiển thị hình tam giác bằng dấu "*".
  - a. Tam giác cân.
  - b. Tam giác vuông.

**Câu 3:**

- Viết chương trình hiển thị các số chẵn trong khoảng từ 1 đến n.

- Viết chương trình liệt kê các số nguyên tố trong phạm vi từ 1 đến n.

- Viết chương trình tính tổng các chữ số của một số nguyên n.

**Câu 4:**

- Viết chương trình kiểm tra một số có phải là số hoàn hảo hay không (số hoàn hảo là số bằng tổng các ước số của nó trừ chính nó).

**Câu 5:** Viết chương trình nhập vào một số nguyên n > 0, hãy:

- a. Xuất ra màn hình các số trong phạm vi từ 1 đến n.
- b. Xuất ra màn hình các số chẵn trong phạm vi từ 1 đến n.
- c. Xuất ra màn hình các số lẻ không chia hết cho 3 trong phạm vi từ 1 đến n.
- d. Tính các biểu thức sau:

`S3 = 1/2 + 2/3 + 3/4 + ...`

`S4 = x^n (với x là số thực nhập từ bàn phím).`

- e. Tính tổng các chữ số của n. Ví dụ: n = 125, tổng các chữ số là 1 + 2 + 5 = 8.

**Câu 6:** Viết chương trình thực hiện:

- a. Nhập một số nguyên n sao cho 0 < n < 100. Nếu nhập sai thì yêu cầu nhập lại.
- b. Đếm số ước của n. Nếu đếm bằng 2 thì xuất ra màn hình "n là số nguyên tố", ngược lại xuất ra "n không phải là số nguyên tố".
- c. Tính tổng các ước của n (không tính chính nó). Nếu tổng các ước đúng bằng n thì xuất ra màn hình "n là số hoàn thiện", ngược lại xuất ra "n không là số hoàn thiện".

**Câu 7:** Viết chương trình hiển thị bảng cửu chương ra màn hình.

<details>
<summary>Click to view full code !</summary>

```cpp
#include <iostream>

using namespace std;

int main() {
    int i, j, s;
    cout << "\nBang cuu chuong\n";

    for (i = 1; i <= 10; i++) {
        cout << "Bang nhan " << i << endl;
        for (j = 0; j <= 10; j++) {
            s = i * j;
            cout << i << " x " << j << " = " << s << endl;
        }
    }

    return 0;
}
```

</details>

**Câu 8:** Viết chương trình thực hiện:

- a. Nhập n > 0.
- b. Liệt kê các số nguyên tố trong phạm vi từ 1 đến n.
- c. Đếm số lượng số nguyên tố trong phạm vi từ 1 đến n.
- d. Tính tổng các số nguyên tố trong phạm vi từ 1 đến n.

**Câu 9:** Viết chương trình thực hiện:

- a. Nhập n > 0.
- b. Tính tổng các chữ số của n. Ví dụ: với n = 12537 thì tổng là 1 + 2 + 5 + 3 + 7 = 18.

### Bài 4: Hàm

Câu 1: Viết chương trình thực hiện các chức năng sau (dùng hàm):

- a. Nhập vào một số nguyên n (0 < n < 100).
- b. Kiểm tra n có phải là số nguyên tố không?
- c. Liệt kê các số nguyên tố trong phạm vi từ 1 đến n.
- d. Đếm số lượng số nguyên tố trong phạm vi từ 1 đến n.
- e. Tính tổng các số nguyên tố trong phạm vi từ 1 đến n.
- f. Tính trung bình cộng các số nguyên tố trong phạm vi từ 1 đến n.

**Câu 2:** Viết chương trình theo hàm cho phép thực hiện chọn lựa công việc:

- a. Giải phương trình bậc 1 ax + b = 0.
- b. Kiểm tra một số nguyên có là số hoàn thiện không?
- c. Liệt kê các số hoàn thiện trong phạm vi từ 1 đến n (n do người dùng nhập).
- d. Tìm ước chung lớn nhất của hai số nguyên a, b nhập từ bàn phím.
- e. Thoát khỏi chương trình.

**Câu 3:** Viết chương trình nhập từ bàn phím 2 số a, b và một ký tự ch. Nếu:

- ch là "+" thì thực hiện phép tính a + b và in kết quả lên màn hình.
- ch là "-" thì thực hiện phép tính a - b và in kết quả lên màn hình.
- ch là "*" thì thực hiện phép tính a* b và in kết quả lên màn hình.
- ch là "/" thì thực hiện phép tính a / b và in kết quả lên màn hình.

**Câu 4:** Viết chương trình tính tiền lương ngày cho công nhân, cho biết trước giờ vào ca, giờ ra ca của mỗi người.

Giả sử:

Tiền trả cho mỗi giờ trước 12 giờ là 6000 đồng và sau 12 giờ là 7500 đồng.
Giờ vào ca sớm nhất là 6 giờ sáng và giờ ra ca trễ nhất là 18 giờ (Giờ sử dụng là giờ nguyên).

<details>
<summary>Click to view full code !</summary>

```cpp
#include <iostream>

using namespace std;

int salaryDay(int v, int r) {
    int s, n;
    if (r < 0 || v > 24) {
        cout << "Error. Enter again" << endl;
    } else {
        n = r - v;
        cout << "Total hour of day: " << n << "h" << endl;
        if (n > 12) {
            s = n * 6000;
            s += (n - 12) * 7500;
        } else {
            s = n * 6000;
        }
        cout << "Today's salary: " << s << "d" << endl;
    }
    return s;
}

int main() {
    int n, r, v;
    cout << "Basic\n ----------Hour in 6h---------\n--------Hour out 18h-----------\n";
    cout << "Enter hour in: ";
    cin >> v;
    cout << "Enter hour out: ";
    cin >> r;
    salaryDay(v, r);
    return 0;
}
```

</details>

**Câu 5:**

- Viết chương trình sử dụng hàm để chuyển đổi số nguyên từ hệ thập phân sang hệ nhị phân.

### Bài 5: Mảng - Array

**Câu 1**: Thực hiện:

- a. Nhập mảng số nguyên gồm n phần tử (0 < n <= 10).
- b. Xuất mảng vừa nhập.

**Câu 2:** Làm tiếp theo trong chương trình của câu 1 với các yêu cầu sau:

- a. Xuất các phần tử chia hết cho 3 có trong mảng.
- b. Đếm số lượng số dương có trong mảng.
- c. Tính tổng các số trong mảng.
- d. Tính trung bình cộng của mảng.
- e. Tính trung bình cộng các phần tử dương có trong mảng.
- f. Xuất các số nguyên tố có trong mảng.
- g. Đếm số lượng số nguyên tố có trong mảng.
- h. Tính tổng các số nguyên tố có trong mảng.
- j. Tính trung bình cộng các số nguyên tố có trong mảng.
- k. Tìm phần tử dương đầu tiên.
- l. Tìm phần tử dương cuối cùng.
- m. Tìm giá trị phần tử lớn nhất (nhỏ nhất) trong mảng.

**Câu 3:** Viết chương trình thực hiện:

- a. Nhập vào mảng a gồm n phần tử, trong quá trình nhập kiểm tra các phần tử nhập vào không được trùng, nếu trùng thì thông báo và yêu cầu nhập lại.
- b. Xuất mảng.
- c. Xuất ra màn hình các phần tử là số chính phương nằm tại những vị trí lẻ trong mảng.
- d. Xuất ra vị trí của các phần tử có giá trị lớn nhất.
- e. Viết hàm tính tổng các phần tử nằm ở vị trí chẵn trong mảng.
- f. Viết hàm sắp xếp mảng theo thứ tự tăng dần.

<details>
<summary>Click to view full code !</summary>

```cpp
#include <iostream>
#include <cmath>

using namespace std;

void nhapMang(int n, int a[]) {
    for (int i = 0; i < n; i++) {
        cout << "a[" << i << "]: ";
        cin >> a[i];
    }
}

void mangChiaHetCho3(int n, int a[]) {
    cout << "Cac so chia het cho 3: ";
    for (int i = 0; i < n; i++) {
        if (a[i] % 3 == 0) {
            cout << a[i] << " ";
        }
    }
    cout << endl;
}

int demSoDuong(int n, int a[]) {
    int cnt = 0;
    for (int i = 0; i < n; i++) {
        if (a[i] > 0) {
            cnt++;
        }
    }
    return cnt;
}

int tongMang(int n, int a[]) {
    int s = 0;
    for (int i = 0; i < n; i++) {
        s += a[i];
    }
    return s;
}

float trungBinhCong(int n, int a[]) {
    return static_cast<float>(tongMang(n, a)) / n;
}

float trungBinhCongSoDuong(int n, int a[]) {
    int s = 0, cnt = 0;
    for (int i = 0; i < n; i++) {
        if (a[i] > 0) {
            s += a[i];
            cnt++;
        }
    }
    return (cnt > 0) ? static_cast<float>(s) / cnt : 0;
}

bool ktnt(int n) {
    if (n < 2) return false;
    for (int i = 2; i <= sqrt(n); i++) {
        if (n % i == 0) return false;
    }
    return true;
}

void xuatSoNguyenTo(int n, int a[]) {
    cout << "Cac so nguyen to trong mang: ";
    for (int i = 0; i < n; i++) {
        if (ktnt(a[i])) {
            cout << a[i] << " ";
        }
    }
    cout << endl;
}

int demSoNguyenTo(int n, int a[]) {
    int cnt = 0;
    for (int i = 0; i < n; i++) {
        if (ktnt(a[i])) {
            cnt++;
        }
    }
    return cnt;
}

int tongSoNguyenTo(int n, int a[]) {
    int s = 0;
    for (int i = 0; i < n; i++) {
        if (ktnt(a[i])) {
            s += a[i];
        }
    }
    return s;
}

float tbcSoNguyenTo(int n, int a[]) {
    int cnt = demSoNguyenTo(n, a);
    return (cnt > 0) ? static_cast<float>(tongSoNguyenTo(n, a)) / cnt : 0;
}

void ptuDuongDauTien(int n, int a[]) {
    cout << "Phan tu duong dau tien: ";
    for (int i = 0; i < n; i++) {
        if (a[i] > 0) {
            cout << a[i] << endl;
            return;
        }
    }
    cout << "Khong co phan tu duong" << endl;
}

void ptuDuongCuoiCung(int n, int a[]) {
    cout << "Phan tu duong cuoi cung: ";
    for (int i = n - 1; i >= 0; i--) {
        if (a[i] > 0) {
            cout << a[i] << endl;
            return;
        }
    }
    cout << "Khong co phan tu duong" << endl;
}

int Max(int n, int a[]) {
    int max = a[0];
    for (int i = 1; i < n; i++) {
        if (a[i] > max) {
            max = a[i];
        }
    }
    return max;
}

int Min(int n, int a[]) {
    int min = a[0];
    for (int i = 1; i < n; i++) {
        if (a[i] < min) {
            min = a[i];
        }
    }
    return min;
}

int main() {
    int n, a[10];
    do {
        cout << "Enter N (1 <= N <= 10): ";
        cin >> n;
        if (n <= 0 || n > 10) {
            cout << "Nhap sai, vui long nhap lai." << endl;
        }
    } while (n <= 0 || n > 10);

    nhapMang(n, a);
    mangChiaHetCho3(n, a);
    cout << "So cac phan tu duong: " << demSoDuong(n, a) << endl;
    cout << "Trung binh cong cua mang: " << trungBinhCong(n, a) << endl;
    cout << "Trung binh cong cac phan tu duong: " << trungBinhCongSoDuong(n, a) << endl;
    xuatSoNguyenTo(n, a);
    cout << "So cac phan tu nguyen to: " << demSoNguyenTo(n, a) << endl;
    cout << "Tong cac so nguyen to: " << tongSoNguyenTo(n, a) << endl;
    cout << "Trung binh cong cac so nguyen to: " << tbcSoNguyenTo(n, a) << endl;
    ptuDuongDauTien(n, a);
    ptuDuongCuoiCung(n, a);
    cout << "Phan tu lon nhat: " << Max(n, a) << endl;
    cout << "Phan tu nho nhat: " << Min(n, a) << endl;

    return 0;
}
```

</details>

### Bài 6: Kiểu dữ liệu cấu trúc - struct

**Câu 1:** Định nghĩa kiểu dữ liệu phần số gồm số và màu số. Viết chương trình thực hiện:

- a. Nhập 1 phần số.
- b. Xuất phần số.
- c. Rút gọn phần số.
- d. Tính tổng 2 phần số.
- e. So sánh 2 phần số.

**Câu 2:** Làm tiếp câu 1, cài đặt các hàm sau:

- a. Nhập vào dãy phần số.
- b. Xuất dãy phần số.
- c. Tính tổng dãy.
- d. Tìm phần số lớn nhất.
- e. Sắp xếp dãy phần số tăng dần.

**Câu 3:** Viết hàm nhập dữ liệu cho một sinh viên, thông tin về sinh viên gồm:

- a. Mã sinh viên (chuỗi 10 ký tự).
- b. Tên (là chuỗi tối đa 10 ký tự).
- c. Ngày tháng năm sinh (theo kiểu int, ví dụ: ngày/tháng/năm).
- d. Giới tính (Nam hoặc Nữ).
- e. Lớp (chuỗi 7 ký tự, trong đó 2 ký tự là năm vào học, 1 ký tự tiếp theo là bậc học (D: Đại học, C: Cao đẳng), 2 ký tự tiếp theo là ngành học (TH: Tin học, KT: Kế toán, QT: Quản trị, ĐT: Điện tử, DT: Điện thoại, ...)).
- f. Điểm toàn, lý, tin (Kiểu số thực).
