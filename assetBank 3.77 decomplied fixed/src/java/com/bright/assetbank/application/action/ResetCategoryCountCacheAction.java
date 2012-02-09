/*    */ package com.bright.assetbank.application.action;
/*    */ 
/*    */ import com.bn2web.common.exception.Bn2Exception;
/*    */ import com.bright.assetbank.category.service.CategoryCountCacheManager;
/*    */ import com.bright.assetbank.user.bean.ABUserProfile;
/*    */ import com.bright.framework.common.action.BTransactionAction;
/*    */ import com.bright.framework.database.bean.DBTransaction;
/*    */ import com.bright.framework.user.bean.UserProfile;
/*    */ import javax.servlet.http.HttpServletRequest;
/*    */ import javax.servlet.http.HttpServletResponse;
/*    */ import org.apache.commons.logging.Log;
/*    */ import org.apache.struts.action.ActionForm;
/*    */ import org.apache.struts.action.ActionForward;
/*    */ import org.apache.struts.action.ActionMapping;
/*    */ 
/*    */ public class ResetCategoryCountCacheAction extends BTransactionAction
/*    */ {
/* 36 */   protected CategoryCountCacheManager m_catCountManager = null;
/*    */ 
/*    */   public void setCategoryCountCacheManager(CategoryCountCacheManager a_sManager) {
/* 39 */     this.m_catCountManager = a_sManager;
/*    */   }
/*    */ 
/*    */   public ActionForward execute(ActionMapping a_mapping, ActionForm a_form, HttpServletRequest a_request, HttpServletResponse a_response, DBTransaction a_dbTransaction)
/*    */     throws Bn2Exception
/*    */   {
/* 49 */     ABUserProfile userProfile = (ABUserProfile)UserProfile.getUserProfile(a_request.getSession());
/*    */ 
/* 52 */     if (!userProfile.getIsAdmin())
/*    */     {
/* 54 */       this.m_logger.debug("This user does not have permission to reset categorycountcache");
/* 55 */       return a_mapping.findForward("NoPermission");
/*    */     }
/*    */ 
/* 58 */     this.m_catCountManager.rebuildCacheNow();
/*    */ 
/* 60 */     return a_mapping.findForward("Success");
/*    */   }
/*    */ }

/* Location:           C:\Users\mamatha\Desktop\com.zip
 * Qualified Name:     com.bright.assetbank.application.action.ResetCategoryCountCacheAction
 * JD-Core Version:    0.6.0
 */