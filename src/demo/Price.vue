<template>
  <div class="price-container">
    <div class="price-wrp">
      <div class="price-header">商业授权说明</div>
      <el-alert
      
        title="开源版本遵循 LGPL 条款发布，如果您不能接受 LGPL，并且需要将该项目用于商业用途且不想保留版权信息（底部“Powered by GavinZhuLei”版权及链接），为保障您的合法权益，请购买商业授权版。详情请QQ咨询"
        class="price-description"
        :closable="false"
        type="info">
      </el-alert>

      <table class="price-table">
        <tr>
          <th style="background: #fbd437;"></th>
          <th style="background:#3aa1ff;">开源版</th>
          <th style="background: #975fe5;">商业授权版</th>
        </tr>
        <tr>
          <td>能否商用</td>
          <td>是</td>
          <td>是</td>
        </tr>
        <tr>
          <td>商业使用方式</td>
          <td>类库引用</td>
          <td>无限制</td>
        </tr>
        <tr>
          <td>能否去掉设计器中版权信息</td>
          <td>否</td>
          <td>能</td>
        </tr>
        <tr>
          <td>二次开发扩展功能</td>
          <td>必须采用LGPL协议开源</td>
          <td>无限制（可以闭源）</td>
        </tr>
        <tr>
          <td>更新服务</td>
          <td>免费更新</td>
          <td>免费更新</td>
        </tr>
        <tr>
          <td>源码发布</td>
          <td>不定时发布最新源码</td>
          <td>优先获取最新源码、使用最新功能</td>
        </tr>
        <tr>
          <td>技术咨询</td>
          <td>-</td>
          <td>快速响应</td>
        </tr>
        <tr>
          <td>处理bug</td>
          <td>不定时</td>
          <td>优先处理</td>
        </tr>
        <tr>
          <td>授权时间</td>
          <td>无需授权</td>
          <td>永久</td>
        </tr>
        <tr>
          <td>价格</td>
          <td><span class="price">免费</span></td>
          <td><span class="price">￥1999 <i>原价 ￥9999</i></span></td>
        </tr>
      </table>

      <div class="price-footer">QQ咨询：1105139475</div>
    </div>
  </div>
</template>

<style lang="scss">
.price-container{
  padding: 20px; 
  .price-wrp{
    width: 1000px;
    margin: 0 auto;
    background: #fff;
    padding: 30px;

    .price-header{
      font-size: 24px;
    }

    .price-description{
      margin: 10px 0;
    }

    .price-table{
      width: 100%;
      margin-top: 20px;
      border-spacing: 0;
      border-collapse: collapse;

      th{
        width: 33%;
        color: #fff;
        border: 1px solid #ccc;
        padding: 10px 20px;
      }

      td {
        border: 1px solid #ccc;
        padding: 10px 20px;

        .price{
          color: red;

          i{
            text-decoration: line-through;
            margin-left: 10px;
            color: #999;
          }
        }
      }
    }

    .price-footer{
      margin: 30px 0;
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style>
