> _Token được trả về (lưu localStorage) khi người dùng đăng nhập, bất cứ hoạt động liên quan tới thông tin người dùng cần truyền token lên để xác thực. Parse Token sẽ lấy được thông tin người dùng_

## Format data trả về

#### Là một object có dạng

```ts
{
  message: string
  data?: any
}
```

#### Ví dụ

```json
{
  "mesgae": "Lấy dự án thành công",
  "data": {
    "id": "f6c06ca1-bae8-4cc6-98c4-62fe0955367a",
    "title": "Java 6 | Spring Boot - Chức năng giỏ hàng",
    "status": "APPROVE",
    "public": true,
    "video": "{url}",
    "source": "{url}",
    "thumbnail": "{url}",
    "major": "Ứng dụng phần mềm",
    "student": {
      "id": "ed31f981-33ef-4a9b-969d-65c5a01b425d",
      "email": "dongnpps24660@fpt.edu.vn",
      "fullname": "Nguyễn Phương Đông",
      "avatar": "{url}"
    },
    "description": {
      "create_at": "2023-07-24T00:00:00.000+00:00",
      "approve_at": "2023-07-25T00:00:00.000+00:00",
      "censor": "Nguyễn Thanh Phước",
      "techs": ["Java", "Spring Boot", "ReactJS"]
      "github": "https://github.com/PhuongDong-2003/FPolyShare",
      "like": 1000,
      "view": 2000
    }
  }
}
```
> Còn nhiều kiểu trả về khác

## Format lỗi trả về

#### Lỗi liên quan đến form (422)

```json
{
  "message": "Lỗi",
  "data": {
    "email": "Email đăng nhập không chính xác",
    "password": "Password không chính xác",
    "...": "..."
  }
}
```

#### Các lỗi còn lại (400, 401, 404, ...)

```json
{
  "message": "Lỗi do (cái gì đó)"
}
```

## Login `/api/login`

Method: `POST`

Body:

```json
{
  "email": "thinhttps24687@fpt.edu.vn",
  "password": "123456"
}
```

## Login với Google `/api/oauth/google`

Method: `GET`

Query params:

- `code`: một chuỗi được trả về từ resource owner, sử dụng chuỗi này để gọi api tới authorization server để lấy `access_token` và `id_token`, gọi api tới resource server để lấy thông tin người dùng.

## Logout `/api/logout`

Method: `POST`

Header:

```json
{
  "Authorization": "Bearer (token)"
}
```

> _Token được gửi lên server sẽ bị xóa khỏi DB (vô hiệu hóa token) cùng với những token liên quan tới người dùng đó, tránh trường hợp được sao chép nhiều lần._

## Lấy tất cả Project `/api/projects`

Method: `GET`

Query Params:

- `title`: Tìm kiếm theo tên project
- `tech`: Tìm kiếm theo công nghệ sử dụng
- `major`: Tìm kiếm theo chuyên ngành
  _(các tham số là tùy chọn, thiếu tất cả thì trả về tất cả project)_

Response:

```json
{
  "message": "...",
  "data": [
    {...}
  ]
}
```

## Xem chi tiết một Project `/api/projects/projectId`

Method: `GET`

Response:

```json
{
  "message": "...",
  "data": {...}
}
```

## Lấy Project theo trạng thái `/api/projects/auth`

Method: `GET`

Query Params:

- `status`: `PENDING` | `APPROVE` | `DENIED`
  _(Trả về tất cả nếu không truyền `status`)_

Header:

```json
{
  "Authorization": "Bearer (token)"
}
```

## Lấy Project liên quan tới giảng viên (chờ duyệt và đã duyệt) `/api/projects/censor`

Method: `GET`

Header:

```json
{
  "Authorization": "Bearer (token)"
}
```

## Tạo mới Project `/api/projects`

Method: `POST`

Body:

```json
{
  ...
}
```

Header:

```json
{
  "Authorization": "Bearer (token)"
}
```

## Cập nhật Project `/api/projects`

Method: `PUT`

Body:

```json
{
  ...
}
```

Header:

```json
{
  "Authorization": "Bearer (token)"
}
```

## Xóa Project `/api/projects`

Method: `DELETE`

Body: _(Một mảng các project_id cần xóa)_

```json
[ ... ]
```

Header:

```json
{
  "Authorization": "Bearer (token)"
}
```

## Lấy danh sách công nghệ sử dụng (cần tham khảo) `/api/techs`

Method: `GET`

## Lấy danh sách các chuyên ngành (cần tham khảo) `/api/majors`

Method: `GET`

## Lấy danh sách giảng viên với chuyên ngành tương ứng (cần tham khảo) `/api/censors`

Method: `GET`

Query Params:

- `major`: Chuyên ngành của người dùng trong phiên đăng nhập hiện tại

## Tạo Feedback `/api/feedbacks`

Method: `POST`

Body:

```json
{
  "project_id": "...",
  "content": "..."
}
```

Header:

```json
{
  "Authorization": "Bearer (token)"
}
```

## Lấy thông tin người dùng `/api/users/me`

Method: `GET`

Header:

```json
{
  "Authorization": "Bearer (token)"
}
```

## Cập nhật thông tin người dùng `/api/users/upload-profile`

Method: `POST`

Body:

```json
{
  ...
}
```

Header:

```json
{
  "Authorization": "Bearer (token)"
}
```
