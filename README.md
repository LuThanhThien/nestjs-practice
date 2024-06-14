<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

Xây dựng backend với Entity **Tenant**, phát triển **Module Tenant** và **Query Service** với chức năng **search**, **sort**, **order** bằng nhiều field khác nhau kèm **Pagination**.

**Rest API:**
- **`GET` `api/v1/tenant`** [Link](https://github.com/LuThanhThien/nestjs-practice/blob/main/src/modules/tenant/tenant.controller.ts): Lấy list `Tenant` bằng `Query Params`
- **`POST` `api/v1/tenant`** [Link](https://github.com/LuThanhThien/nestjs-practice/blob/main/src/modules/tenant/tenant.controller.ts): Tạo record cho entity `Tenant`

**Query Service:** [Link](https://github.com/LuThanhThien/nestjs-practice/blob/main/src/modules/query/query.service.ts)
- Nhận các `Query Params` và tạo `Query Builder` bằng `TypeORM`.
- Cấu trúc của Query Params: [Link](https://github.com/LuThanhThien/nestjs-practice/blob/main/src/modules/query/interfaces/query-param.interface.ts)

  ```typescript
  export interface QueryParams {
      [key: string]: string | number | boolean | string[] | undefined | null;
      sortBy?: string;
      orderAsc?: string;
      pageNumber?: number;
      perPage?: number;
  } 
  
- Trả về Query Response bao gồm list các record trả về, links cho pagination và metadata như sau [Link](https://github.com/LuThanhThien/nestjs-practice/blob/main/src/modules/query/dto/query-response.dto.ts):
  
  ```typescript
  export interface QueryResponse<T> {
      data: T[],
      links: {
        self: string,
        first: string,
        previous: string,
        next: string,
        last: string,
      },
      metadata: {
        sortBy?: string;
        orderAsc?: boolean;
        pageNumber?: number;
        perPage?: number;
        totalPage?: number;
        totalRecords?: number;
      },
  }

**Ví dụ:**
  + **HTTP Method:** `POST`
  + **URL:** `api/v1/tenant?sortBy=subcriptionStartDate&orderAsc=false&pageNumber=1&perPage=2&email=.com&phone=812`
  + **Mô tả:** query list các record của entity `Tenant`.
    - **Search** bằng email bao gồm chuỗi `.com` và phone bao gồm `812`.
    - **Sort** bằng `subcriptionStartDate`
    - **Orde**r bằng `DESC` (`orderAsc=false`)
    - **Trang hiện tại:** 1
    - **Số record trên trang:** 2
  + **Response:**
    ```typescript
        {
        "data": [
            {
                "status": "ACTIVE",
                "subcriptionStartDate": "2023-09-14T17:00:00.000Z",
                "createdAt": "2024-06-14T03:22:11.242Z",
                "lastModifiedAt": "2024-06-14T03:22:11.242Z",
                "id": 3,
                "email": "deny.dang@gmail.com",
                "name": "Denny Dang",
                "phone": "0789182812",
                "subcriptionEndDate": "2025-09-14T17:00:00.000Z"
            },
            {
                "status": "INACTIVE",
                "subcriptionStartDate": "2022-01-31T17:00:00.000Z",
                "createdAt": "2024-06-14T03:22:16.292Z",
                "lastModifiedAt": "2024-06-14T05:04:30.055Z",
                "id": 4,
                "email": "nvdung@gmail.com",
                "name": "Nguyen Van Dung",
                "phone": "0789281212",
                "subcriptionEndDate": "2024-04-30T17:00:00.000Z"
            }
        ],
        "links": {
            "self": "pageNumber=1&sortBy=subcriptionStartDate&orderAsc=false&perPage=2&email=.com&phone=812",
            "first": "pageNumber=1&sortBy=subcriptionStartDate&orderAsc=false&perPage=2&email=.com&phone=812",
            "previous": "pageNumber=1&sortBy=subcriptionStartDate&orderAsc=false&perPage=2&email=.com&phone=812",
            "next": "pageNumber=2&sortBy=subcriptionStartDate&orderAsc=false&perPage=2&email=.com&phone=812",
            "last": "pageNumber=2&sortBy=subcriptionStartDate&orderAsc=false&perPage=2&email=.com&phone=812"
        },
        "metadata": {
            "sortBy": "subcriptionStartDate",
            "orderAsc": false,
            "pageNumber": 1,
            "perPage": 2,
            "email": ".com",
            "totalPages": 2,
            "totalRecords": 4
        }
    }


## License

Nest is [MIT licensed](LICENSE).
